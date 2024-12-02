/* eslint-disable react/require-default-props */

'use client';

import { useGetAllUsersByRole } from '@queries';
import { UserRoles } from '@src/types/modules';
import { useForm } from 'react-hook-form';
import { useGetAllChats } from '@queries/useChatQuery';
import { useEffect, useState } from 'react';
import socket from '@src/utils/socket';
import { useAuthContext } from '@context/AuthContext';
import { ChatFormType } from './types';
import { ChatWindow } from './chatWindow';
import { ChatHeader } from './chatHeader';
import { ChatLists } from './chatUserLists';

function Chat({ isAdmin = false }: { isAdmin?: boolean }) {
  const chatForm = useForm<ChatFormType>({ mode: 'all' });

  const { setValue, watch } = chatForm;

  const [typingConversationId, setTypingConversationId] = useState<
    string | undefined
  >(undefined);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { authenticatedUser } = useAuthContext() || {};

  const { userId: currentUserId } = authenticatedUser || {};

  const { selectedConversationId, selectedUserId } = watch();

  const { data: admins = [] } = useGetAllUsersByRole({
    role: UserRoles.SuperAdmin,
  });

  const {
    data: allChatsLists,
    refetch: refetchAllChatsLists,
    isLoading: isAllChatsLoading,
  } = useGetAllChats();

  const adminOptions =
    (admins?.length &&
      admins?.map(({ userId = '', name = '', firstName, lastName, email }) => {
        const fullName = `${firstName || ''} ${lastName || ''}`;
        const trimmedName =
          fullName?.trim() !== '' ? fullName : email?.split('@')?.[0];
        const userName = name || trimmedName;

        return {
          value: userId,
          label: userName as string,
        };
      })) ||
    [];

  useEffect(() => {
    if (allChatsLists?.length) {
      setValue('allChatsLists', allChatsLists);
    }
    if (admins?.length) {
      setValue('admins', admins);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allChatsLists, admins]);

  useEffect(() => {
    socket.emit('joinChat', { userId: currentUserId });
    socket.on('receiveMessage', (newMessage) => {
      if (newMessage?.receiverId === currentUserId) {
        refetchAllChatsLists();
      }
    });
    return () => {
      socket.off('receiveMessage');
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId, currentUserId]);

  useEffect(() => {
    socket.on('typing', (data) => {
      if (data.conversationId === selectedConversationId) {
        setTypingConversationId?.(data.conversationId);
        setIsTyping(data?.isTyping);
        if (!data?.isTyping) {
          setTypingConversationId?.(undefined);
        }
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId, currentUserId]);

  return (
    <>
      <div className="w-full hidden lg:!block">
        <ChatHeader
          adminOptions={adminOptions}
          isAdmin={isAdmin}
          form={chatForm}
        />
        <div className="flex h-[75vh] w-full">
          <div>
            <ChatLists
              typingConversationId={typingConversationId}
              form={chatForm}
              isAllChatsLoading={isAllChatsLoading}
            />
          </div>
          <ChatWindow
            form={chatForm}
            refetchAllChatsLists={refetchAllChatsLists}
            setTypingConversationId={setTypingConversationId}
            typingConversationId={typingConversationId}
            isTyping={isTyping}
          />
        </div>
      </div>
      <div className="w-full lg:!hidden flex flex-col h-[75vh]">
        {!selectedUserId ? (
          <ChatLists
            form={chatForm}
            isAdmin={isAdmin}
            adminOptions={adminOptions}
            isAllChatsLoading={isAllChatsLoading}
            typingConversationId={typingConversationId}
          />
        ) : (
          <ChatWindow
            form={chatForm}
            refetchAllChatsLists={refetchAllChatsLists}
            setTypingConversationId={setTypingConversationId}
            typingConversationId={typingConversationId}
            isTyping={isTyping}
          />
        )}
      </div>
    </>
  );
}

export default Chat;
