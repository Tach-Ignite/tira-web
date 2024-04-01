import {
  AnnouncementService,
  AnnouncementType,
  AnnouncementArticleType,
  AnnouncementTimelineType,
} from '@services';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';

export const useGetAnnouncement = () => {
  const keys = [ApiKeysEnum.GetAnnouncement];
  const fetchFn = async () => {
    const data = AnnouncementService.getAnnouncements();
    return data;
  };
  return useBaseQuery<AnnouncementType>(keys, fetchFn);
};

export const useGetAnnouncementArticles = () => {
  const keys = [ApiKeysEnum.GetAnnouncementArticles];
  const fetchFn = async () => {
    const data = AnnouncementService.getAnnouncementArticles();
    return data;
  };
  return useBaseQuery<AnnouncementArticleType>(keys, fetchFn);
};

export const useGetAnnouncementTimeline = () => {
  const keys = [ApiKeysEnum.GetAnnouncementTimeline];
  const fetchFn = async () => {
    const data = AnnouncementService.getAnnouncementTimeline();
    return data;
  };
  return useBaseQuery<AnnouncementTimelineType>(keys, fetchFn);
};

export const useGetAnnouncementSingleArticle = (articleSlug: string) => {
  const keys = [ApiKeysEnum.GetAnnouncementSingleArticle, articleSlug];
  const fetchFn = async () => {
    const data = AnnouncementService.getAnnouncementSingleArticle(articleSlug);
    return data;
  };
  return useBaseQuery<AnnouncementArticleType>(keys, fetchFn);
};
