import BaseApi from '@/service/api/baseApi';
import { UserInfo } from '@/types/liveblocks';

export default class UserApi extends BaseApi {
  constructor() {
    super();
  }

  async userInfo(userId: string) {
    const response = await this.get<Liveblocks['UserMeta']['info']>(
      `/api/users?userId=${userId}`,
    );
    return response;
  }

  async resolveUsers(searchParams: URLSearchParams) {
    const response = await this.get<Array<UserInfo>>(
      `/api/user-info?${searchParams}`,
    );
    return response;
  }

  async resolveMentionSuggestions(text: string) {
    const response = await this.get<string[]>(
      `/api/user-info/search?text=${text}`,
    );
    return response;
  }
}

export const userApi = new UserApi();
