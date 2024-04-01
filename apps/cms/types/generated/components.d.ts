import type { Schema, Attribute } from '@strapi/strapi';

export interface AnnouncementAnnouncementFields extends Schema.Component {
  collectionName: 'components_announcement_announcement_fields';
  info: {
    displayName: 'AnnouncementFields';
    icon: 'discuss';
    description: '';
  };
  attributes: {
    Title: Attribute.Text & Attribute.Required;
    Subtitle: Attribute.Text & Attribute.Required;
    ProductFriendlyIds: Attribute.Component<
      'announcement.product-friendly-ids',
      true
    > &
      Attribute.Required;
  };
}

export interface AnnouncementProductFriendlyIds extends Schema.Component {
  collectionName: 'components_announcement_product_friendly_ids';
  info: {
    displayName: 'ProductFriendlyIds';
    icon: 'priceTag';
    description: '';
  };
  attributes: {
    ProductFriendlyId: Attribute.String & Attribute.Required;
  };
}

export interface TimelineTimeline extends Schema.Component {
  collectionName: 'components_timeline_timelines';
  info: {
    displayName: 'Timeline';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Image: Attribute.Media<'images'> & Attribute.Required;
    Content: Attribute.RichText & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'announcement.announcement-fields': AnnouncementAnnouncementFields;
      'announcement.product-friendly-ids': AnnouncementProductFriendlyIds;
      'timeline.timeline': TimelineTimeline;
    }
  }
}
