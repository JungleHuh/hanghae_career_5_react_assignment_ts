// src/store/auth/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUser } from '@/types/authType';
import { registerUserAPI } from '@/api/auth';

interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  registerError: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
  registerUser: (payload: { email: string; password: string; name: string }) => Promise<void>;
}

type PersistedState = Pick<AuthState, 'isLogin' | 'user'>;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: null,
      registerStatus: 'idle',
      registerError: null,
      setIsLogin: (isLogin) => set({ isLogin }),
      setUser: (user) => set({ user, isLogin: true }),
      logout: () => set({ isLogin: false, user: null }),
      registerUser: async (payload) => {
        set({ registerStatus: 'loading' });
        try {
          const user = await registerUserAPI(payload);
          set({ registerStatus: 'succeeded', user, isLogin: true });
        } catch (error: any) {
          set({
            registerStatus: 'failed',
            registerError: error.message || 'Registration failed'
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedState => ({ 
        isLogin: state.isLogin, 
        user: state.user 
      }),
    }
  )
);

// 선택자 함수들
export const selectIsLogin = (state: AuthState) => state.isLogin;
export const selectUser = (state: AuthState) => state.user;
export const selectRegisterStatus = (state: AuthState) => state.registerStatus;
export const selectRegisterError = (state: AuthState) => state.registerError;