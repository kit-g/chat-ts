import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Chat room name',
    example: 'Jane Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateMessageDto {
  @ApiProperty({
    description: 'Content of the message',
    example: 'Hello world!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}


export class RoomDto {
  @ApiProperty({
    description: 'Unique identifier of the room',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the room',
    example: 'General Chat',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The timestamp when the room was created',
    example: '2023-10-01T15:35:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the room was last updated',
    example: '2023-10-02T10:15:00.000Z',
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}


export class MessageDto {
  @ApiProperty({
    description: 'Unique identifier of the message',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Content of the message',
    example: 'Hello world!',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The timestamp when the message was created',
    example: '2023-10-01T15:35:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the message was last updated',
    example: '2023-10-02T10:15:00.000Z',
  })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description: 'The unique identifier of the room the message belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  roomId: string;
}
