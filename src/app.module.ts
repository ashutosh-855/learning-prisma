import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { StaffModule } from './staff/staff.module';
import { SettingModule } from './setting/setting.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'learning-prisma',
    // }),
    DatabaseModule,
    ProductsModule,
    ReviewsModule,
    OrganizationModule,
    UserModule,
    StaffModule,
    SettingModule,
    AuthModule,
    ThrottlerModule.forRoot ({
    throttlers: [
      {
        ttl: 60000,
        limit: 100,
      },
    ],
  }),
  ],
  controllers: [AppController],

  providers: [AppService,
    {
      provide: APP_GUARD,
        useClass: ThrottlerGuard,
    },
  ],

  
})
export class AppModule {}
