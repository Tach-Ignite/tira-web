/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { Spinner, Textarea } from '@src/atoms';
import { PaperPlaneIcon, PencilIcon } from '@src/icons';
import socket from '@src/utils/socket';
import { useAuthContext } from '@context/AuthContext';
import { useEffect, useRef } from 'react';
import { ChatInputProps } from '../types';

function ChatInput(props: ChatInputProps) {
  const {
    form,
    refetchAllChatsLists,
    refetchChatConversation,
    isSending,
    setIsSending,
  } = props;

  const { authenticatedUser } = useAuthContext() || {};
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<any>(null);

  const { control, watch, setValue } = form;

  const {
    typedMessage = '',
    selectedUserId,
    selectedConversationId = '',
  } = watch();

  const { userId: currentUserId } = authenticatedUser || {};

  const onSendMessage = async () => {
    if (typedMessage && !isSending) {
      try {
        setIsSending(true);
        socket.emit('sendMessage', {
          content: typedMessage,
          senderId: currentUserId,
          receiverId: selectedUserId,
        });
        await refetchChatConversation?.();
        const refetchedChatLists: any = await refetchAllChatsLists?.();

        if (!selectedConversationId) {
          const newConversationId =
            refetchedChatLists?.data?.[0]?.conversationId;
          setValue('selectedConversationId', newConversationId);
        }
        setValue('typedMessage', '');
      } catch (e) {
        setIsSending(false);
      } finally {
        setIsSending(false);
      }
    }
  };

  const adjustTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      if (textAreaRef.current.scrollHeight) {
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [typedMessage]);

  const handleInputChange = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    socket.emit('typing', {
      conversationId: selectedConversationId,
      receiverId: selectedUserId,
      isTyping: true,
    });

    // Set a timeout to emit 'stopTyping' after 3 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      socket.emit('typing', {
        conversationId: selectedConversationId,
        receiverId: selectedUserId,
        isTyping: false,
      });
    }, 1000);
  };

  return (
    <div className="border border-primary-100 flex bg-white dark:bg-gray-800 rounded-[30px]">
      <div className="relative w-full">
        <div className="w-full">
          {typedMessage.trim() === '' && (
            <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
              <div className="flex ml-5 items-center space-x-4 text-[#64748B] dark:text-gray-50">
                <PencilIcon className="h-6 w-6" />
                <span className="font-normal text-[14px] leading-[17px]">
                  Type your message here...
                </span>
              </div>
            </div>
          )}

          <Textarea
            control={control}
            onChange={handleInputChange}
            ref={textAreaRef}
            name="typedMessage"
            className="min-h-[100px] !text-black !text-[14px] !leading-[21px] dark:!text-gray-50 !p-2 !ml-3 !pt-10 !bg-white dark:!bg-gray-800 !border-none overflow-hidden !pl-12"
            maxLength={10000000000}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 p-6">
        {/* <div className="w-12 h-12 rounded-[50px] cursor-pointer flex justify-center items-center bg-primary-50 dark:bg-gray-900">
      <FaceLaughIcon className="text-gray-600 dark:text-gray-50 w-5 h-5" />
    </div>
    <div className="w-12 h-12 rounded-[50px] cursor-pointer flex justify-center items-center bg-primary-50 dark:bg-gray-900">
      <PaperClipIcon className="text-gray-600 dark:text-gray-50 w-6 h-6" />
    </div> */}
        {typedMessage.trim() !== '' && (
          <div
            onClick={onSendMessage}
            className="w-12 h-12 rounded-[50px] cursor-pointer flex justify-center items-center bg-chat-light-gradient dark:bg-chat-dark-gradient"
          >
            {isSending ? (
              <Spinner className="fill-white dark:fill-black" />
            ) : (
              <PaperPlaneIcon className="text-white h-6 w-6" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatInput;
