// chat.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getConversation(senderId: string, receiverId: string) {
    let conversation = await this.prisma.conversations.findFirst({
      where: {
        OR: [
          { AND: { receiverId: receiverId, senderId: senderId } },
          { AND: { receiverId: senderId, senderId: receiverId } },
        ],
      },
    });

    if (!conversation?.conversationId) {
      conversation = await this.prisma.conversations.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
        },
      });
    }
    return conversation;
  }

  async createMessage(data: {
    content: string;
    senderId: string;
    receiverId: string;
  }) {
    const { senderId, receiverId, content } = data;
    const conversation = await this.getConversation(senderId, receiverId);

    const newMessage = await this.prisma.messages.create({
      data: {
        content,
        senderId,
        receiverId,
        conversationId: conversation.conversationId,
      },
    });

    return newMessage;
  }

  async findAllChatsForUser(userId: string) {
    const conversations = await this.prisma.conversations.findMany({
      where: { OR: [{ receiverId: userId }, { senderId: userId }] },
      include: {
        receiver: {
          select: {
            userId: true,
            name: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            email: true,
          },
        },
        sender: {
          select: {
            userId: true,
            name: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            email: true,
          },
        },
        _count: {
          select: {
            messages: {
              where: {
                isRead: false, // Only count unread messages
                receiverId: userId, // Only for messages sent to this user
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    const sortedConversations = conversations.sort((a, b) => {
      const aLatestMessageDate = a.messages[0]?.createdAt || new Date(0);
      const bLatestMessageDate = b.messages[0]?.createdAt || new Date(0);
      return bLatestMessageDate.getTime() - aLatestMessageDate.getTime();
    });
    return sortedConversations;
  }

  async findConversation(conversationId: string, userId: string) {
    return this.prisma.conversations.findFirst({
      where: {
        OR: [{ receiverId: userId }, { senderId: userId }],
        conversationId: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async markAllRead(conversationId: string, userId: string) {
    return this.prisma.conversations.update({
      where: {
        OR: [{ receiverId: userId }, { senderId: userId }],
        conversationId: conversationId,
      },
      data: {
        messages: {
          updateMany: {
            where: { isRead: false, receiverId: userId },
            data: {
              isRead: true,
            },
          },
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async getTotalUnreadCount(userId: string) {
    const conversations = await this.findAllChatsForUser(userId);
    return conversations.reduce((total, conversation) => {
      return total + (conversation._count.messages || 0);
    }, 0);
  }
}
