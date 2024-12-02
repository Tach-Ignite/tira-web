/* eslint-disable react/no-array-index-key */

'use client';

import { Select } from '@src/atoms';
import { ChatHeaderProps } from '../types';
import ChatUser from './ChatUser';
import ChatUserSkeleton from './ChatUserSkeleton';

const defaultChatLists = 5;

function ChatLists(props: ChatHeaderProps) {
  const {
    form,
    isAdmin,
    adminOptions = [],
    isAllChatsLoading,
    typingConversationId,
  } = props;

  const { watch, control } = form;

  const { allChatsLists } = watch();

  return (
    <>
      <div className="lg:!hidden block bg-chat-opacity-light-gradient dark:bg-chat-opacity-dark-gradient rounded-t-2xl">
        {isAdmin ? (
          <p className="w-[299px] mt-4 p-4 font-bold text-[18px] leading-[27px]">
            Chat
          </p>
        ) : (
          <Select
            className="w-[299px] p-4"
            selectClassName="dark:border dark:rounded-lg dark:border-gray-300"
            control={control}
            name="selectedUser"
            optionTitle="Available Admin"
            options={adminOptions}
          />
        )}
      </div>
      <div className="lg:!w-[300px] w-full h-full bg-white dark:bg-gray-700 border-0 lg:!border-r-[0.5px] !border-gray-300 overflow-y-auto chat-scrollbar rounded-bl-2xl rounded-br-2xl lg:!rounded-br-none">
        {isAllChatsLoading ? (
          <div className="space-y-2">
            {Array.from({ length: defaultChatLists }).map((_, index) => (
              <ChatUserSkeleton key={index} />
            ))}
          </div>
        ) : (
          allChatsLists?.map((chatUser, index) => (
            <ChatUser
              {...chatUser}
              form={form}
              index={index}
              key={chatUser?.conversationId}
              typingConversationId={typingConversationId}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ChatLists;
