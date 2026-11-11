import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('status')
  getStatus() {
    return {
      configured: this.storageService.isConfigured(),
      provider: 'Backblaze B2 (S3 Compatible)',
      status: this.storageService.isConfigured() ? 'active' : 'fallback-local',
    };
  }

  @Post('presigned-url')
  async getPresignedUrl(@Body() body: { filename: string; contentType: string }) {
    return this.storageService.getPresignedUploadUrl(
      body.filename || 'asset.jpg',
      body.contentType || 'image/jpeg',
    );
  }
}
