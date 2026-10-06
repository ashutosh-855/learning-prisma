import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  static resolveConnectionString(): string {
    const configuredUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

    if (!configuredUrl) {
      throw new Error('Database connection string is missing.');
    }

    return configuredUrl.includes('-pooler.')
      ? configuredUrl.replace('-pooler.', '.')
      : configuredUrl;
  }

  constructor() {
    const connectionString = DatabaseService.resolveConnectionString();

    console.log(
      'DATABASE_URL:',
      connectionString ? 'DEFINED' : 'UNDEFINED',
    );

    const adapter = new PrismaPg({ connectionString });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}