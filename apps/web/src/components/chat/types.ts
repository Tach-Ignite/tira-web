/* eslint-disable no-unused-vars */

import { UserEntity } from '@services';
import {
  ChatConversationEntity,
  ChatMessageEntity,
} from '@services/chat/chat.type';
import { SelectOptions } from '@src/atoms/types';
import { UseFormReturn } from 'react-hook-form';

export interface ChatFormType {
  selectedUserId?: string;
  typedMessage?: string;
  selectedConversationId?: string;
  admins?: UserEntity[];
  allChatsLists?: ChatConversationEntity[];
}

export interface ChatHeaderProps {
  isAdmin?: boolean;
  adminOptions?: SelectOptions[];
  form: UseFormReturn<ChatFormType>;
  isAllChatsLoading?: boolean;
  typingConversationId?: string;
}

export interface ChatUserInfoProps {
  form: UseFormReturn<ChatFormType>;
}

export interface ChatWindowProps {
  form: UseFormReturn<ChatFormType>;
  refetchAllChatsLists: () => void;
  isTyping?: boolean;
  typingConversationId?: string;
  setTypingConversationId?: (typingConversationId?: string) => void;
}

export interface ChatInputProps {
  form: UseFormReturn<ChatFormType>;
  refetchAllChatsLists: () => void;
  refetchChatConversation: () => void;
  setIsSending: (isSending: boolean) => void;
  isSending: boolean;
}

export interface ChatUserProps extends ChatConversationEntity {
  index?: number;
  form: UseFormReturn<ChatFormType>;
  typingConversationId?: string;
}

export interface ChatBubbleAvatarProps {
  chat?: ChatMessageEntity;
  form: UseFormReturn<ChatFormType>;
  showTypingIndicator?: boolean;
  isReceiver?: boolean;
}
