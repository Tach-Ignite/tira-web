export interface TitleWithLinksType {
  id: number;
  name: string;
  path: string;
}

export interface IImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface IImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        small: IImageFormat;
        medium: IImageFormat;
        thumbnail: IImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface ISectionProperties {
  rightSectionClassName?: string;
  leftSectionClassName?: string;
  rightComponentAnimation?: string;
  isOpenInNewTab?: boolean;
  leftComponentAnimation?: string;
  imageClassName?: string;
  imagePosition?: string;
  titleClassName?: string;
  showDivider?: boolean;
  subTitleClassName?: string;
  descriptionClassName?: string;
  linkClassName?: string;
  btnClassName?: string;
  btnGradient?: string;
  showPattern?: boolean;
  linkType?: string;
  buttonLink?: string;
  buttonText?: string;
  buttonIcon?: any;
  serviceImageClass?: string;
  servicesListClass?: string;
  serviceBoxClass?: string;
  serviceBoxInner?: string;
  serviceListItemClass?: string;
  serviceListIconClass?: string;
  serviceListIconSvgClass?: string;
  serviceListContentClass?: string;
  serviceListContentTitleClass?: string;
  serviceListContentDescClass?: string;
  boxedBtnClass?: string;
  checkListClassName?: string;
  sectionHeaderStyle?: string;
  programItemStyle?: string;
  ctaContainerClassName?: string;
}

export interface IAbout {
  id: number;
  title: string;
  showPattern?: boolean;
  subTitle: string | null;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  btnClassName: string;
  buttonIcon: any | null;
  image: IImage;
}

export interface IServiceItem {
  id: number;
  title: string;
  description: string;
  showIcon: boolean;
  icon: string;
}

export interface IService {
  id: number;
  title: string;
  items: IServiceItem[];
  image: IImage;
}

export interface CohortType {
  id: number;
  title: string;
  subTitle: string;
  buttonName: string;
  buttonLink: string;
  image: IImage;
  links: TitleWithLinksType[];
}

export interface FormLinkType {
  id: number;
  primaryTitle: string;
  secondaryTitle?: string;
  links: TitleWithLinksType[];
}

export interface HomePageDataResponse {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  about?: IAbout;
  service?: IService;
  announcements?: CohortType[];
  formLinks?: FormLinkType;
}

export interface HomePageProps {
  data: HomePageDataResponse;
}

export interface CohortPageProps {
  data: CohortType;
  sectionProperties?: ISectionProperties;
}

export interface AboutProps {
  data?: IAbout;
  sectionProperties?: ISectionProperties;
  className?: string;
}

export interface ExtendedServiceProps {
  services: IServiceItem[];
  serviceBoxClass: string;
  serviceBoxInner: string;
  serviceListContentTitleClass: string;
  serviceListContentDescClass: string;
}

export interface IServicesProps {
  service?: IService;
  bgColor?: string;
  sectionProperties?: ISectionProperties;
  className?: string;
}

export interface FormLinksProps {
  data?: FormLinkType;
  className?: string;
  withExtraSpace?: boolean;
  sectionProperties?: ISectionProperties;
}

export interface IDefaultSection {
  id: number;
  title: string;
  showPattern?: boolean;
  subTitle: string | null;
  description1: string | null;
  description2: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  btnClassName: string;
  buttonIcon: any | null;
  image: IImage;
  listItems?: {
    checked: boolean;
    description: string;
  }[];
  icon?: React.ReactNode;
}

export interface DefaultSectionProps {
  id?: string;
  data?: IDefaultSection;
  sectionProperties?: ISectionProperties;
  className?: string;
}
