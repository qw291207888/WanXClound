import { onMounted, watch } from 'vue';
import { useState } from '#app';

// 定义 AuthState 接口
interface AuthState {
  authToken: string | null;
  userId: string | null;
}

// 获取 token 的初始值
function getInitialState(): AuthState {
  if (process.client) {
    return {
      authToken: localStorage.getItem('authToken'),
      userId: localStorage.getItem('userId'),
    };
  }
  return {
    authToken: null,
    userId: null,
  };
}

// 持久化保存状态
function saveState({ authToken, userId }: AuthState): void {
  if (process.client) {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }

    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }
}

export function useAuthToken() {
  const authState = useState<AuthState>('authState', getInitialState);

  // 当 authToken 或 userId 变化时，保存到 localStorage
  watch(
    () => [authState.value.authToken, authState.value.userId],
    ([authToken, userId]) => {
      saveState({ authToken, userId });
    },
    { deep: true }
  );

  return authState;
}
