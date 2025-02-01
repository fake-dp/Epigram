import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

console.log(process.env.NEXT_PUBLIC_API_BASE_URL, 'url');

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  console.log('현재 사용 중인 accessToken:', accessToken);
  console.log('요청 URL:', config.url);

  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        console.error('No refresh token available. Logging out...');
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const newAccessToken = data.accessToken;
        localStorage.setItem('access_token', newAccessToken);
        useAuthStore.setState({ accessToken: newAccessToken });

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
