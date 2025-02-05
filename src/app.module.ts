import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, ConfigService],
  exports: [PrismaService],
})
export class AppModule {
}
