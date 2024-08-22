import axios from 'axios';
import { defineNuxtPlugin } from 'nuxt/app';
import { useAuthToken } from '~/composables/useAuthToken';

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  const axiosInstance = axios.create({
    baseURL: 'http://10.33.23.250:8000',
  });

  // axiosInstance.interceptors.request.use(config => config, error => Promise.reject(error));
  // axiosInstance.interceptors.response.use(response => response, error => Promise.reject(error));
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = useAuthToken().value.authToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data.code === 2101) {
        navigateTo({ path: '/login', query: { redirect: route.fullPath } });
      }
      return response;
    },
    (error) => {
      // 处理响应错误
      return Promise.reject(error);
    }
  );

  nuxtApp.provide('axios', axiosInstance);
});