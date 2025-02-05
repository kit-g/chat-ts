import { IsEmail, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '0b13f89c-1edc-4f8a-ac87-4c9cba76703b',
  })
  id: string;

  @ApiProperty({
    description: 'The user\'s email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The user\'s username',
    example: 'username123',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-02-04T23:24:53.496Z',
  })
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-02-04T23:24:53.496Z',
    nullable: true,
  })
  @IsDate()
  updated_at?: Date | null;
}
