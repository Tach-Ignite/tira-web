'use server';

import { cmsGet } from '@services/fetch';

export const getAnnouncements = async () =>
  cmsGet(
    'announcement?populate[0]=Announcement&populate[1]=Announcement.ProductFriendlyIds',
  );

export const getAnnouncementArticles = async () =>
  cmsGet('articles?populate[0]=Image');

export const getAnnouncementSingleArticle = async (articleSlug: string) =>
  cmsGet(`articles?filters[Slug][$eq]=${articleSlug}&populate[0]=Image`);

export const getAnnouncementTimeline = async () =>
  cmsGet('timeline?populate[0]=Timeline&populate[1]=Timeline.Image');
