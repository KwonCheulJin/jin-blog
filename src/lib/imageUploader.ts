import { commonApi } from '@/service/api/commonApi';

export async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append('image', image);
  const { data } = await commonApi.upload(formData);

  return data.publicUrl;
}
