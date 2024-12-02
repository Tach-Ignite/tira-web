'use client';

import { Select } from '@src/atoms';
import { ChatHeaderProps } from '../types';
import HeaderUserInfo from './HeaderUserInfo';

function ChatHeader(props: ChatHeaderProps) {
  const { isAdmin, adminOptions = [], form } = props || {};

  const { control, watch, setValue } = form;

  const { allChatsLists } = watch();

  const onSelectAvailableAdmin = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event?.target || {};
    if (value === 'Available Admin') {
      setValue('selectedUserId', undefined);
    } else {
      setValue('selectedUserId', value);
    }
    const conversationIdByUser = allChatsLists?.find(
      ({ receiverId, senderId }) => receiverId === value || senderId === value,
    )?.conversationId;
    setValue('selectedConversationId', conversationIdByUser);
  };

  return (
    <div className="bg-chat-opacity-light-gradient dark:bg-chat-opacity-dark-gradient rounded-t-2xl flex">
      <div className="!border-r-[0.5px] !border-gray-300">
        {isAdmin ? (
          <p className="w-[299px] mt-4 p-4 font-bold text-[18px] leading-[27px]">
            Chat
          </p>
        ) : (
          <Select
            className="w-[299px] p-4"
            selectClassName="dark:border dark:rounded-lg dark:border-gray-300"
            control={control}
            name="selectedUserId"
            onChange={onSelectAvailableAdmin}
            optionTitle="Available Admin"
            options={adminOptions}
          />
        )}
      </div>
      <HeaderUserInfo form={form} />
    </div>
  );
}

export default ChatHeader;
