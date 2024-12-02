/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { Avatar } from '@src/flowbite';
import { getInitials } from '@src/lib/string';
import { formatMessageDate } from '@src/lib/date';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@context/AuthContext';
import { useUpdateCharMarkAsRead } from '@queries/useChatQuery';
import { ChatUserProps } from '../types';

function ChatUser(props: ChatUserProps) {
  const {
    form,
    conversationId = '',
    receiver,
    messages,
    index,
    _count,
    receiverId,
    senderId,
    sender,
    typingConversationId,
  } = props;

  const { updatedAt, content } = messages[messages?.length - 1] || {};

  const { setValue, watch } = form;

  const date = formatMessageDate(new Date(updatedAt));
  const initialFormattedDate = date === '0 min' ? 'Just now' : date;

  const [formattedDate, setFormattedDate] = useState(initialFormattedDate);

  const { mutateAsync: updateMarkAsReadsync } = useUpdateCharMarkAsRead({});

  const { authenticatedUser } = useAuthContext() || {};

  const { userId: currentUserId } = authenticatedUser || {};

  const user = currentUserId === receiverId ? sender : receiver;

  useEffect(() => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(updatedAt).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    const shouldUpdateRealTime =
      diffMins < 60 ||
      diffMs / (1000 * 60 * 60) < 12 ||
      diffMs / (1000 * 60 * 60 * 24) < 1;

    if (shouldUpdateRealTime) {
      const interval = setInterval(() => {
        setFormattedDate(formatMessageDate(new Date(updatedAt)));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [updatedAt]);

  const {
    profileImage: receiverProfileImage,
    name: receiverFullName = '',
    firstName: receiverFirstName = '',
    lastName: receiverLastName = '',
    email: receiverEmail = '',
  } = user || {};

  const { messages: unreadMessageCount } = _count || {};

  const { selectedConversationId } = watch();

  const imageUrl = receiverProfileImage
    ? `${process.env.BUCKET_PREFIX}${receiverProfileImage}`
    : undefined;

  const fullName = `${receiverFirstName || ''} ${receiverLastName || ''}`;

  const isNamePresent = receiverFullName || fullName?.trim() !== '';

  const trimmedName =
    fullName?.trim() !== '' ? fullName : receiverEmail?.split('@')?.[0];

  const receiverName = receiverFullName || trimmedName;

  const receiverInitial = isNamePresent
    ? getInitials(receiverName?.toUpperCase())
    : getInitials(receiverEmail?.toUpperCase());

  const onSelectAdminToChat = async () => {
    if (conversationId !== selectedConversationId) {
      const selectedUser = currentUserId === receiverId ? senderId : receiverId;
      setValue('selectedConversationId', conversationId);
      setValue('selectedUserId', selectedUser);
      setValue('typedMessage', '');
      await updateMarkAsReadsync?.(conversationId);
    }
  };

  const isSelectedConversation = selectedConversationId === conversationId;

  const unreadColor =
    unreadMessageCount &&
    `bg-indigo-50 dark:bg-gray-800 ${index !== 0 ? '!border-t border-gray-300' : ''}`;

  const activeColor =
    isSelectedConversation &&
    '!bg-chat-20-light-gradient dark:!bg-chat-20-dark-gradient';

  return (
    <div
      onClick={onSelectAdminToChat}
      className={`space-y-2 p-4 no-select !shadow-xl cursor-pointer hover:bg-indigo-50 hover:dark:bg-gray-800 ${unreadMessageCount ? unreadColor : ''} ${activeColor}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Avatar
            size="sm"
            img={receiverProfileImage ? imageUrl : undefined}
            placeholderInitials={receiverInitial}
            rounded
            title="profile"
            theme={{
              root: {
                initials: {
                  text: 'font-medium text-[##111827] text-[12px] leading-[12px]',
                  base: 'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-400',
                },
              },
            }}
          />
          <p className="font-semibold text-[14px] leading-[21px] text-gray-900 dark:text-gray-50">
            {receiverName}
          </p>
        </div>
        <p className="font-normal whitespace-nowrap text-[12px] leading-[12px] text-gray-500 dark:text-gray-100">
          {formattedDate}
        </p>
      </div>
      <div className="flex justify-between items-center">
        {typingConversationId && typingConversationId === conversationId ? (
          <p className="text-[14px] leading-[21px] !text-transparent !bg-clip-text bg-chat-light-gradient dark:bg-chat-dark-gradient">
            typing...
          </p>
        ) : (
          <p className="text-gray-500 w-[220px] oneLine-ellipsis dark:text-gray-100 font-normal text-[14px] leading-[21px]">
            {content}
          </p>
        )}
        {unreadMessageCount && !isSelectedConversation ? (
          <div className="w-8 h-8 rounded-[50px] bg-chat-light-gradient dark:bg-chat-dark-gradient text-center place-content-center font-medium text-[14px] leading-[21px] text-gray-50">
            {unreadMessageCount}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ChatUser;
