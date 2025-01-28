import { axiosInstance } from './axios';

interface ApiParam {
    url: string;
    headers?: Record<string, string>;
    data?: Record<string, unknown>;
  }

export const get = async (param: ApiParam) => {
  const { url = '', headers = {} } = param;
  const result = await axiosInstance.get(url, { headers });
  return result;
};

export const post = async (param: ApiParam) => {
  const { url = '', data = {}, headers = {} } = param;
  const result = await axiosInstance.post(url, data, { headers });
  return result;
};


export const put = async (param: ApiParam) => {
    const { url = '', data = {}, headers = {} } = param;
    const result = await axiosInstance.put(url, data, { headers });
    return result;
  };

export const patch = async (param: ApiParam) => {
  const { url = '', data = {}, headers = {} } = param;
  const result = await axiosInstance.patch(url, data, { headers });
  return result;
};

export const del = async (param: ApiParam) => {
  const { url = '', headers = {}, data = {} } = param;
  const result = await axiosInstance.delete(url, { headers, data });
  return result;
};

export const api = {
  get,
  post,
  patch,
  del,
  put,
};
