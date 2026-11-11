import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3Client: S3Client | null = null;
  private bucketName: string;
  private publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    const keyId = this.configService.get<string>('BACKBLAZE_B2_KEY_ID');
    const appKey = this.configService.get<string>('BACKBLAZE_B2_APPLICATION_KEY');
    const endpoint = this.configService.get<string>('BACKBLAZE_B2_ENDPOINT') || 'https://s3.us-east-005.backblazeb2.com';
    const region = this.configService.get<string>('BACKBLAZE_B2_REGION') || 'us-east-005';
    this.bucketName = this.configService.get<string>('BACKBLAZE_B2_BUCKET_NAME') || 'valjons-streetwear';
    this.publicUrl = this.configService.get<string>('BACKBLAZE_B2_PUBLIC_URL') || `${endpoint}/${this.bucketName}`;

    if (keyId && appKey && !keyId.includes('placeholder')) {
      this.s3Client = new S3Client({
        endpoint,
        region,
        credentials: {
          accessKeyId: keyId,
          secretAccessKey: appKey,
        },
      });
      this.logger.log('☁️ Backblaze B2 S3 storage client initialized');
    } else {
      this.logger.warn('ℹ️ Backblaze B2 credentials not provided. Storage will run in mock/local fallback mode.');
    }
  }

  isConfigured(): boolean {
    return this.s3Client !== null;
  }

  async getPresignedUploadUrl(filename: string, contentType: string): Promise<{ uploadUrl: string; fileKey: string; publicUrl: string }> {
    const fileKey = `uploads/${Date.now()}-${filename.replace(/\s+/g, '_')}`;

    if (!this.s3Client) {
      return {
        uploadUrl: `/api/storage/mock-upload?key=${encodeURIComponent(fileKey)}`,
        fileKey,
        publicUrl: `/uploads/${fileKey}`,
      };
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return {
      uploadUrl,
      fileKey,
      publicUrl: `${this.publicUrl}/${fileKey}`,
    };
  }

  async uploadBuffer(buffer: Buffer, filename: string, contentType: string): Promise<string> {
    const fileKey = `products/${Date.now()}-${filename.replace(/\s+/g, '_')}`;

    if (!this.s3Client) {
      return `/uploads/${fileKey}`;
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: buffer,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return `${this.publicUrl}/${fileKey}`;
  }

  getPublicUrl(key: string): string {
    if (key.startsWith('http://') || key.startsWith('https://') || key.startsWith('/')) {
      return key;
    }
    return `${this.publicUrl}/${key}`;
  }
}
