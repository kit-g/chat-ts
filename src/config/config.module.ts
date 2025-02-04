import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config'; // Import the official ConfigModule

@Module({
  imports: [
    NestConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
}
