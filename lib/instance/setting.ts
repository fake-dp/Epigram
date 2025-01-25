import { axiosInstance , axiosMultipartInstance} from './axios';

interface ApiParam {
    url: string;
    headers?: Record<string, string>;
    data?: Record<string, unknown>;
  }

export const get = async (param: ApiParam) => {
  const { url = '', headers = {} } = param;
  let result = await axiosInstance.get(url, { headers });
  return result;
};

export const post = async (param: ApiParam) => {
  const { url = '', data = {}, headers = {} } = param;
  const result = await axiosInstance.post(url, data, { headers });
  return result;
};

export const mpost = async (param: ApiParam) => {
  const { url = '', data = {} } = param;
  const result = await axiosMultipartInstance.post(url, data);
  return result;
};

export const mpatch = async (param: ApiParam) => {
  const { url = '', data = {} } = param;
  const result = await axiosMultipartInstance.patch(url, data);
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
  mpost,
  patch,
  del,
  put,
  mpatch
};
