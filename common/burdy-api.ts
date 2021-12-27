import axios from 'axios';
import { IBurdyPage } from '../types/burdy-cms';

export type GetPostOptions = {
  token?: string;
  includeChildren?: boolean;
  perPage?: number;
};

export const getPost = async (slugPath: string, options?: GetPostOptions) => {
  const token = options?.token;
  const headers: any = {};
  const params: any = {
    includeChildren: options?.includeChildren,
    perPage: options?.perPage,
  };
  if (token) {
    headers.token = token;
    params.allowUnpublished = true;
  }

  const { data } = await axios.get<IBurdyPage<any>>(slugPath, {
    params,
    headers,
  });
  return data;
};
