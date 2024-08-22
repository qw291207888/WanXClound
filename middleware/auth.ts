import { nextTick } from 'vue';
import { useAuthToken } from '~/composables/useAuthToken';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    await nextTick();

    // 获取持久化的 authToken
    const authState = useAuthToken().value;

    if (!authState.authToken) {
      authState.authToken = localStorage.getItem('authToken');
    }
    if (!authState.userId) {
      authState.userId = localStorage.getItem('userId');
    }

    if (!authState.authToken && to.name !== 'login') {
      console.log('No token found, navigating to /login');
      return navigateTo({ path: '/login', query: { refresh: 'true', redirect: to.fullPath } });
    } else if (authState.authToken && to.name === 'login') {
      console.log('Token found, navigating to /');
      return navigateTo('/');
    }
  }
});
