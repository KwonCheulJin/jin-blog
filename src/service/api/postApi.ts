import BaseApi from '@/service/api/baseApi';
import { Post, PostDetail, SimplePost } from '@/types';
import { AxiosResponse } from 'axios';

export default class PostApi extends BaseApi {
  constructor() {
    super();
  }
  async allPost() {
    const response = await this.get<Array<SimplePost>>('/api/post');
    return response;
  }
  async postDetail(id: string) {
    const response = await this.get<PostDetail>(`/api/post/${id}`);
    return response;
  }
  async publishPost({
    title,
    sub_title,
    markdown,
    tags,
  }: Post): Promise<AxiosResponse<Array<PostDetail>, any>> {
    const response = await this.post<Array<PostDetail>>('/api/post', {
      title,
      sub_title,
      markdown,
      tags,
    });
    return response;
  }
}

export const postApi = new PostApi();
