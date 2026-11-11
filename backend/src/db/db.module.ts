import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { drizzleProvider, DRIZZLE_PROVIDER } from './drizzle.provider';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [drizzleProvider],
  exports: [DRIZZLE_PROVIDER],
})
export class DbModule {}
