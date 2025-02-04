import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers() {
    return this.prisma.user.findMany();
  }
}
