import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetCurrentUserId } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chats')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async findAllChatsForUser(@GetCurrentUserId() userId: string) {
    return this.chatService.findAllChatsForUser(userId);
  }

  @Get('conversation/:conversationId')
  async findConversation(
    @Param('conversationId') conversationId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.chatService.findConversation(conversationId, userId);
  }

  @Get('total-unread-count')
  async getTotalUnreadCount(@GetCurrentUserId() userId: string) {
    return this.chatService.getTotalUnreadCount(userId);
  }

  @Patch('mark-read/:conversationId')
  update(
    @Param('conversationId') conversationId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.chatService.markAllRead(conversationId, userId);
  }
}
