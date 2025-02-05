import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto, CreateMessageDto } from './dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findAll() {
    return this.prisma.room.findMany();
  }

  async create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: {
        ...createRoomDto,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
      include: { messages: true },
    });
  }

  async update(id: string, updateRoomDto: CreateRoomDto) {
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }

  async createMessage(id: string, createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        ...createMessageDto,
        room_id: id,
      },
    });
  }

  async findMessages(id: string, pagination: { page: number; limit: number; sort: string }) {
    const { page, limit, sort } = pagination;
    return this.prisma.message.findMany({
      where: { room_id: id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sort]: 'asc', // or 'desc'
      },
    });
  }

  async findMessage(_: string, messageId: string) {
    return this.prisma.message.findUnique({
      where: { id: messageId },
    });
  }

  async updateMessage(_: string, messageId: string, createMessageDto: CreateMessageDto) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: createMessageDto,
    });
  }

  async removeMessage(_: string, messageId: string) {
    return this.prisma.message.delete({
      where: { id: messageId },
    });
  }
}
