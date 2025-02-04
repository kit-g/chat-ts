import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, ConfigService],
  exports: [PrismaService],
})
export class AppModule {
}
