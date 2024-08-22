import { AxiosInstance } from 'axios';
import '@nuxt/types';

// 为 Nuxt 插件类型增加 $axios
declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
