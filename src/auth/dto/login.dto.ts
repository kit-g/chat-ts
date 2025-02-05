import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The user\'s email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The user\'s password',
    example: 'strongPassword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
