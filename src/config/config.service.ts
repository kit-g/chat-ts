import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {
  }

  get(key: string): string {
    const v: string | undefined = this.configService.get(key);
    if (!v) {
      throw new Error(`${key} config value is not specified`);
    }
    return v;
  }
}
