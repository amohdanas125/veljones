import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';

export const DRIZZLE_PROVIDER = 'DRIZZLE_PROVIDER';

export const drizzleProvider = {
  provide: DRIZZLE_PROVIDER,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const connectionString = configService.get<string>('DATABASE_URL');
    if (!connectionString || connectionString.trim() === '' || connectionString.includes('placeholder')) {
      console.log('ℹ️ NeonDB DATABASE_URL is not set or using placeholder. Running in-memory database fallback.');
      return null;
    }

    try {
      const pool = new Pool({
        connectionString,
        ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
      });
      
      const db = drizzle(pool, { schema });
      console.log(' Successfully connected to NeonDB with Drizzle ORM!');
      return db;
    } catch (error: any) {
      console.warn('⚠️ NeonDB connection failed, falling back to local dataset:', error.message);
      return null;
    }
  },
};
