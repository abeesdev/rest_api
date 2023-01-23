import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.createTypeOrmOptions(),
      inject: [ConfigService],
    }),
    NestConfigModule.forRoot({
      isGlobal: true,
    }),

    MailerModule.forRoot({
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
      transport: {
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'abeesdevop@gmail.com',
          pass: 'yewpxzcjxrtmzere',
        },
      },
    }),
    CacheModule.register({
      host: '178.128.48.4',
      port: 6379,
      password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
    }),
    UserModule,
    ConfigModule,
  ],
})
export class AppModule {}
