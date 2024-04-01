import { BlocksContent } from '@strapi/blocks-react-renderer';

export interface AnnouncementAttributeType {
  id: number;
  Title: string;
  Subtitle: string;
  ProductFriendlyIds: { id: number; ProductFriendlyId: string }[];
}

export interface ImageAttributeType {
  url: string;
  ext: string;
  width: number;
  height: number;
}

export interface AnnouncementTimelineAttributeType {
  id: number;
  Title: string;
  Content: string;
  Image: { data: { id: number; attributes: ImageAttributeType } };
}

export interface AnnouncementArticleAttributeType {
  id: number;
  Title: string;
  Slug: string;
  Subtitle: string;
  TopContentText: BlocksContent;
  BottomContentText: BlocksContent;
  Image: { data: { id: number; attributes: ImageAttributeType } };
}

export interface AnnouncementType {
  data: { attributes: { Announcement: AnnouncementAttributeType } };
}

export interface AnnouncementArticleType {
  data: { id: number; attributes: AnnouncementArticleAttributeType }[];
}

export interface AnnouncementTimelineType {
  data: { attributes: { Timeline: AnnouncementTimelineAttributeType[] } };
}
