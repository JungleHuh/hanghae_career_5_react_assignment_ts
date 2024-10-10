/*
import { RootState } from '@/store';

export const selectIsLogin = (state: RootState): boolean => state.auth.isLogin;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRegisterStatus = (state: RootState): string =>
  state.auth.registerStatus;
export const selectRegisterError = (state: RootState): string | null =>
  state.auth.registerError;
*\



/*
import { useAuthStore } from './authSlice';  // authStore는 이전에 만든 Zustand 스토어입니다.

export const selectIsLogin = (): boolean => useAuthStore.getState().isLogin;
export const selectUser = () => useAuthStore.getState().user;
export const selectRegisterStatus = (): string => useAuthStore.getState().registerStatus;
export const selectRegisterError = (): string | null => useAuthStore.getState().registerError;

// 컴포넌트 내에서 사용 예시:
// import { selectIsLogin, selectUser, selectRegisterStatus, selectRegisterError } from './authSelectors';
//
// function MyComponent() {
//   const isLogin = useAuthStore(selectIsLogin);
//   const user = useAuthStore(selectUser);
//   const registerStatus = useAuthStore(selectRegisterStatus);
//   const registerError = useAuthStore(selectRegisterError);
//
//   // ... 컴포넌트 로직
// }
*/