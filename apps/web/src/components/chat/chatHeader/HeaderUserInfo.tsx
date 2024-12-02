'use client';

import { Avatar } from '@src/flowbite';
import { ArrowLeftIcon } from '@src/icons';
import { getInitials } from '@src/lib/string';
import { ChatUserInfoProps } from '../types';

function ChatUserInfo(props: ChatUserInfoProps) {
  const { form } = props;

  const { setValue, watch } = form;

  const { admins, selectedUserId, selectedConversationId, allChatsLists } =
    watch();

  const onBackToChatLists = () => {
    setValue('selectedUserId', undefined);
    setValue('selectedConversationId', undefined);
  };

  const selectedAdminInfoDetails = admins?.find(
    ({ userId }) => userId === selectedUserId,
  );

  const selectedChatListsUserInfo = allChatsLists?.find(
    ({ conversationId }) => conversationId === selectedConversationId,
  );

  const { receiverId, receiver, sender } = selectedChatListsUserInfo || {};

  const user = selectedUserId === receiverId ? receiver : sender;

  const userInfoDetails =
    selectedUserId && !user?.userId ? selectedAdminInfoDetails : user;

  const {
    profileImage,
    userId,
    name,
    firstName,
    lastName,
    email = '',
  } = userInfoDetails || {};

  const imageUrl = profileImage
    ? `${process.env.BUCKET_PREFIX}${profileImage}`
    : undefined;

  const fullName = `${firstName || ''} ${lastName || ''}`;

  const isNamePresent = name || fullName?.trim() !== '';

  const trimmedName =
    fullName?.trim() !== '' ? fullName : email?.split('@')?.[0];

  const userName = name || trimmedName;

  const initial = isNamePresent
    ? getInitials(userName?.toUpperCase())
    : getInitials(email?.toUpperCase());

  return userId ? (
    <div className="p-4 flex gap-3 items-center">
      <div className="flex gap-2 items-center">
        <ArrowLeftIcon
          className="lg:!hidden inline text-gray-900"
          onClick={onBackToChatLists}
        />
        <Avatar
          size="sm"
          img={profileImage ? imageUrl : undefined}
          placeholderInitials={initial}
          rounded
          title="profile"
          theme={{
            root: {
              size: { sm: 'h-12 w-12' },
              initials: {
                text: 'font-medium text-[#111827] text-[12px] leading-[12px]',
                base: 'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-400',
              },
            },
          }}
        />
      </div>
      <div>
        <p className="font-semibold text-[18px] leading-[27px] text-gray-900">
          {userName}
        </p>
        {/* {isOnline ? (
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-lg border-2 bg-[#31C48D] border-white" />{' '}
        <span>Online</span>
      </div>
    ) : null} */}
      </div>
    </div>
  ) : null;
}

export default ChatUserInfo;
