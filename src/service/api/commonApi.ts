import BaseApi from '@/service/api/baseApi';

export default class CommonApi extends BaseApi {
  constructor() {
    super();
  }

  async upload(formData: FormData) {
    const response = await this.post<{ publicUrl: string }>(
      `/api/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  }
}

export const commonApi = new CommonApi();
