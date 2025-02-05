import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('register')
  @ApiBody({ type: RegisterDto, description: 'User registration object' })
  @ApiOperation({ summary: 'User Registration', description: 'Registers a new user.' })
  @ApiResponse({
    status: 201,
    type: UserDto,
    description: 'User successfully registered',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async register(@Body() body: RegisterDto): Promise<UserDto> {
    const { password, ...user } = await this.authService.register(body.email, body.username, body.password);
    return user;
  }

  @Post('login')
  @ApiBody({ type: LoginDto, description: 'Login object' })
  @ApiResponse({ status: 201, description: 'Session created' })
  @ApiOperation({ summary: 'Session registration', description: 'Logs the user in.' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
