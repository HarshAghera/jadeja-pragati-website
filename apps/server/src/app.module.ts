import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blogs/blogs.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'), // 👈 important: load .env from root
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        if (!mongoUri) {
          throw new Error('❌ MONGODB_URI not found in environment variables');
        }
        Logger.log(`✅ MONGODB_URI found: ${mongoUri}`, 'AppModule');
        return {
          uri: mongoUri,
        };
      },
    }),

    UsersModule,
    AuthModule,
    BlogModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
