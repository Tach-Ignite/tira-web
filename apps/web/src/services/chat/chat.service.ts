'use server';

import { get, patch } from '@services/fetch';
import { ChatConversationEntity, ConversationResponse } from './chat.type';

export const getAllChats = async (): Promise<ChatConversationEntity[]> =>
  get('chat');

export const getChatConversation = async (
  conversationId: string,
): Promise<ConversationResponse> => get(`chat/conversation/${conversationId}`);

export const updateConversationMarkAsRead = async (conversationId: string) =>
  patch(`chat/mark-read/${conversationId}`, {});

export const getTotalChatsUnreadCount = async (): Promise<number> =>
  get('chat/total-unread-count');
