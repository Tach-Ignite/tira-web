import { UserEntity } from '@services/users/users.type';

export interface ChatMessageEntity {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Count {
  messages: number;
}

export interface ChatConversationEntity {
  conversationId: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  receiverId: string;
  receiver: UserEntity;
  sender: UserEntity;
  _count: Count;
  messages: ChatMessageEntity[];
}

export interface ConversationResponse {
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
  receiverId: string;
  messages: ChatMessageEntity[];
}
