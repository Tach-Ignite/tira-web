'use client';

import {
  useGetChatConversation,
  useUpdateCharMarkAsRead,
} from '@queries/useChatQuery';
import { getMessageDateLabel } from '@src/lib/date';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageEntity } from '@services/chat/chat.type';
import { useAuthContext } from '@context/AuthContext';
import socket from '@src/utils/socket';
import ChatBubbleAvatar from './ChatBubbleAvatar';
import HeaderUserInfo from '../chatHeader/HeaderUserInfo';
import { ChatWindowProps } from '../types';
import ChatInput from './ChatInput';

function ChatWindow(props: ChatWindowProps) {
  const { form, typingConversationId, isTyping } = props;

  const { getValues } = form;

  const { selectedConversationId = '', selectedUserId = '' } = getValues();

  const { authenticatedUser } = useAuthContext() || {};
  const [isSending, setIsSending] = useState<boolean>(false);

  const { userId: currentUserId } = authenticatedUser || {};

  const { data: currentUserAllMessages, refetch: refetchChatConversation } =
    useGetChatConversation(selectedConversationId);

  const { mutateAsync: updateMarkAsReadsync } = useUpdateCharMarkAsRead({});

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { messages } = currentUserAllMessages || {};

  const chatsByDayWise =
    messages?.reduce((acc: any, chat) => {
      const messageDateLabel = getMessageDateLabel(new Date(chat.createdAt));

      if (!acc[messageDateLabel]) {
        acc[messageDateLabel] = [];
      }
      acc[messageDateLabel].push(chat);

      return acc;
    }, {}) || {};

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, selectedConversationId, isTyping]);

  const updateMarkAsRead = async () => {
    await updateMarkAsReadsync(selectedConversationId);
  };

  useEffect(() => {
    socket.on('receiveMessage', async (newMessage) => {
      if (newMessage?.senderId === selectedUserId) {
        await updateMarkAsRead();
        refetchChatConversation?.();
      }
    });
    updateMarkAsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId, selectedUserId]);

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="lg:!hidden sticky top-0 block bg-chat-opacity-light-gradient dark:bg-chat-opacity-dark-gradient rounded-t-2xl">
        <HeaderUserInfo form={form} />
      </div>
      <div
        ref={chatWindowRef}
        className="flex-grow place-content-end overflow-y-auto bg-white dark:bg-gray-700 w-full chat-scrollbar p-4 pl-3"
      >
        {Object.keys(chatsByDayWise)
          .reverse()
          .map((dateLabel) => (
            <div key={dateLabel} className="w-full">
              <div className="text-center font-semibold text-gray-500 dark:text-gray-100 my-4">
                {dateLabel}
              </div>
              <div className="flex space-y-4 flex-col">
                {chatsByDayWise[dateLabel].map((chat: ChatMessageEntity) => {
                  const { messageId, receiverId: chatReceiverId } = chat;

                  const isReceiver = chatReceiverId === currentUserId;

                  return (
                    <div
                      key={messageId}
                      className={`flex w-full ${!isReceiver ? 'justify-end' : 'justify-start'}`}
                    >
                      <ChatBubbleAvatar
                        chat={chat}
                        form={form}
                        isReceiver={!isReceiver}
                      />
                    </div>
                  );
                })}
                {typingConversationId &&
                typingConversationId === selectedConversationId ? (
                  <ChatBubbleAvatar form={form} showTypingIndicator />
                ) : null}
              </div>
            </div>
          ))
          .reverse()}
      </div>
      {selectedUserId ? (
        <div className="sticky bottom-0 bg-white dark:bg-gray-700 rounded-br-2xl lg:!rounded-bl-none rounded-bl-2xl p-4 z-10">
          <ChatInput
            {...props}
            refetchChatConversation={refetchChatConversation}
            setIsSending={setIsSending}
            isSending={isSending}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ChatWindow;
