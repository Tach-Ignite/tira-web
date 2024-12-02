/* eslint-disable no-unused-vars */

'use client';

import { formatChatDate } from '@src/lib/date';
import { Avatar } from '@src/flowbite';
import { getInitials } from '@src/lib/string';
import { ChatBubbleAvatarProps } from '../types';
import TypingIndicator from './TypingIndicator';

function ChatBubbleAvatar(props: ChatBubbleAvatarProps) {
  const { chat, form, showTypingIndicator, isReceiver } = props;

  const { watch } = form;

  const { content, updatedAt = '', senderId, receiverId } = chat || {};

  const { allChatsLists, selectedConversationId, selectedUserId } = watch();

  const bubbleColor = isReceiver
    ? 'bg-gray-100 dark:bg-gray-900'
    : 'bg-indigo-50 dark:bg-gray-800';

  const arrowColor = isReceiver
    ? 'border-l-gray-100 dark:border-l-gray-900'
    : 'border-l-indigo-50 dark:border-l-gray-800';

  const { receiver, sender } =
    allChatsLists?.find(
      ({ conversationId }) => conversationId === selectedConversationId,
    ) || {};

  const chatUser = sender?.userId === senderId ? sender : receiver;

  const typingUser = selectedUserId === receiver?.userId ? receiver : sender;

  const user = showTypingIndicator ? typingUser : chatUser;

  const {
    profileImage,
    name = '',
    firstName = '',
    lastName = '',
    email = '',
  } = user || {};

  const imageUrl = profileImage
    ? `${process.env.BUCKET_PREFIX}${profileImage}`
    : undefined;

  const fullName = `${firstName || ''} ${lastName || ''}`;

  const isNamePresent = name || fullName?.trim() !== '';

  const trimmedName = fullName?.trim() !== '' ? fullName : email;

  const userName = name || trimmedName;

  const initial = isNamePresent
    ? getInitials(userName?.toUpperCase())
    : getInitials(email?.toUpperCase());

  return (
    <div
      className={`flex gap-3 justify-end items-center space-x-2 ${!isReceiver ? 'flex-row-reverse !gap-5' : ''}`}
    >
      <div
        className={`flex items-center ${isReceiver ? 'flex-row-reverse' : ''} gap-3`}
      >
        <div
          className={`relative text-black font-normal text-[14px] leading-[21px] dark:text-gray-50 p-4 rounded-2xl w-[75%] ${bubbleColor}`}
        >
          {showTypingIndicator ? (
            <TypingIndicator />
          ) : (
            <p className="break-all overflow-wrap">{content}</p>
          )}
          <div
            className={`absolute ${!isReceiver ? 'left-[-12px] rotate-180' : 'right-[-12px]'} top-1/2 lg:!flex hidden transform -translate-y-1/2`}
          >
            <div
              className={`w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[14px] ${arrowColor}`}
            />
          </div>
        </div>
        <p
          className={`font-normal w-[80px] text-[12px] leading-[12px] text-gray-500 dark:text-gray-100 ${isReceiver ? 'text-end' : 'text-start'}`}
        >
          {formatChatDate(
            new Date(showTypingIndicator ? new Date() : updatedAt),
          )}
        </p>
      </div>
      <div className="lg:!flex hidden">
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
                text: 'font-medium text-[##111827] text-[12px] leading-[12px]',
                base: 'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-400',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default ChatBubbleAvatar;
