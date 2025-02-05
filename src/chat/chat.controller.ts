import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { RoomDto, CreateMessageDto, CreateRoomDto, MessageDto } from './dto';

@ApiTags('Rooms')
@Controller('rooms')
export class ChatController {
  constructor(private readonly roomsService: ChatService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of rooms' })
  @ApiResponse({ status: 200, type: [RoomDto] })
  async getRooms() {
    return this.roomsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a room' })
  @ApiResponse({ status: 201, type: RoomDto })
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single room' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: RoomDto })
  async getRoom(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a room' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: RoomDto })
  async updateRoom(@Param('id') id: string, @Body() updateRoomDto: CreateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204 })
  async deleteRoom(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }

  // For messages
  @Post(':id/messages')
  @ApiOperation({ summary: 'Send a message' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 201, type: MessageDto })
  async createMessage(@Param('id') id: string, @Body() createMessageDto: CreateMessageDto) {
    return this.roomsService.createMessage(id, createMessageDto);
  }

  @Get(':id/messages')
  @ApiOperation({ summary: 'Get messages in a room (with pagination)' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: [MessageDto] })
  async getMessages(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'createdAt', // Default sorting by creation date
  ) {
    return this.roomsService.findMessages(id, { page, limit, sort });
  }

  @Get(':id/messages/:messageId')
  @ApiOperation({ summary: 'Get a specific message' })
  @ApiParam({ name: 'id', type: String })
  @ApiParam({ name: 'messageId', type: String })
  @ApiResponse({ status: 200, type: MessageDto })
  async getMessage(@Param('id') id: string, @Param('messageId') messageId: string) {
    return this.roomsService.findMessage(id, messageId);
  }

  @Put(':id/messages/:messageId')
  @ApiOperation({ summary: 'Update a specific message' })
  @ApiParam({ name: 'id', type: String })
  @ApiParam({ name: 'messageId', type: String })
  @ApiResponse({ status: 200, type: MessageDto })
  async updateMessage(
    @Param('id') id: string,
    @Param('messageId') messageId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.roomsService.updateMessage(id, messageId, createMessageDto);
  }

  @Delete(':id/messages/:messageId')
  @ApiOperation({ summary: 'Delete a specific message' })
  @ApiParam({ name: 'id', type: String })
  @ApiParam({ name: 'messageId', type: String })
  @ApiResponse({ status: 204 })
  async deleteMessage(@Param('id') id: string, @Param('messageId') messageId: string) {
    return this.roomsService.removeMessage(id, messageId);
  }
}
