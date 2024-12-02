import { ChatService } from '@services';
import {
  ChatConversationEntity,
  ConversationResponse,
} from '@services/chat/chat.type';
import useBaseQuery from './useBaseQuery';
import { ApiKeysEnum } from './apiKeys';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllChats = () => {
  const keys = [ApiKeysEnum.GetAllChats];
  const fetchFn = async () => {
    const data = await ChatService.getAllChats();
    return data;
  };
  return useBaseQuery<ChatConversationEntity[]>(keys, fetchFn);
};

export const useGetChatConversation = (conversationId: string) => {
  const keys = [
    ApiKeysEnum.GetChatConversations,
    conversationId,
    ApiKeysEnum.GetChatsTotalUnreadCount,
  ];
  const fetchFn = async () => {
    const data = await ChatService.getChatConversation(conversationId);
    return data;
  };
  return useBaseQuery<ConversationResponse>(keys, fetchFn);
};

export const useUpdateCharMarkAsRead = (request: UseBaseMutationConfig) => {
  const mutationFn = async (conversationId: string) => {
    const mutation =
      await ChatService.updateConversationMarkAsRead(conversationId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [
      ApiKeysEnum.GetChatMarkAsRead,
      ApiKeysEnum.GetAllChats,
      ApiKeysEnum.GetChatsTotalUnreadCount,
    ],
  });
};

export const useGetTotalChatsUnreadCount = () => {
  const keys = [ApiKeysEnum.GetChatsTotalUnreadCount];
  const fetchFn = async () => {
    const data = await ChatService.getTotalChatsUnreadCount();
    return data;
  };
  return useBaseQuery<number>(keys, fetchFn, { refetchInterval: 10 * 1000 });
};
