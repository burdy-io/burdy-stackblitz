import { GetStaticPropsContext, GetStaticPropsResult, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { GetPostOptions } from '../common/burdy-api';

export interface IBurdyPage<T extends {}> {
  id: number;
  name: string;
  slug: string;
  slugPath: string;
  createdAt: Date;
  updatedAt: Date;
  contentType: {
    name: string;
    type: string;
  };
  author: {
    firstName: string;
    lastName: string;
  };
  meta: {
    content: T;
  };
  tags: IBurdyTag[];
}

export interface IBurdyTag {
  id: number;
  name: string;
  slug: string;
  slugPath: string;
  parent: Omit<IBurdyTag, 'parent'>;
}

export interface IBurdyImage {
  id?: number;
  name?: string;
  height?: number;
  width?: number;
  mimeType?: string;
  tags?: IBurdyTag[];
  src?: string;
  alt?: string;
}

export type IBurdyBlog = IBurdyPage<{
  title: string;
  description: string;
  featured: [IBurdyImage];
  content: any;
  seo: {
    title: string;
    description: string;
    featured: [IBurdyImage];
  };
}>;

export type GetTemplateProps<
  G extends { [key: string]: any } = { [key: string]: any },
  P extends { [key: string]: any } = { [key: string]: any }
> = (
  page: IBurdyPage<G>,
  path: string,
  options?: GetPostOptions
) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>;

export type BurdyPage<
  T extends { [key: string]: any } = { [key: string]: any },
  P extends { [key: string]: any } = { [key: string]: any }
> = React.VoidFunctionComponent<
  {
    page: IBurdyPage<P>;
  } & T
>;
