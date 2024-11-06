import { BASE_URL } from '@/lib/constants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class BaseApi {
  protected static instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  protected async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) {
    return BaseApi.instance.get<T, R, D>(url, config);
  }

  protected async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    return BaseApi.instance.post<T, R, D>(url, data, config);
  }

  protected async put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    return BaseApi.instance.put<T, R, D>(url, data, config);
  }

  protected async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) {
    return BaseApi.instance.delete<T, R, D>(url, config);
  }
}
