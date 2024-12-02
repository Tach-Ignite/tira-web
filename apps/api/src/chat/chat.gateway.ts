/* eslint-disable @typescript-eslint/no-unused-vars */
// chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    data: { content: string; senderId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.createMessage(data);
    this.server.to(data.receiverId).emit('receiveMessage', message);
    this.server
      .to(data.receiverId)
      .emit('typing', { ...data, isTyping: false });
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody('userId') userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(userId);
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody()
    data: { content: string; senderId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.receiverId).emit('typing', data);
  }
}
