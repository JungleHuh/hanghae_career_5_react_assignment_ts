// src/store/auth/authStore.ts

import { create } from 'zustand'
import { IUser } from '@/types/authType'
import { registerUserAPI } from '@/api/auth'  // API 함수 임포트

interface AuthState {
  isLogin: boolean
  user: IUser | null
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  registerError: string | null
  setIsLogin: (isLogin: boolean) => void
  setUser: (user: IUser) => void
  logout: () => void
  registerUser: (payload: { email: string; password: string; name: string }) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,
  
  setIsLogin: (isLogin) => set({ isLogin }),
  
  setUser: (user) => set({ user, isLogin: true }),
  
  logout: () => set({ isLogin: false, user: null }),
  
  registerUser: async (payload) => {
    set({ registerStatus: 'loading' })
    try {
      const user = await registerUserAPI(payload)
      set({ registerStatus: 'succeeded', user, isLogin: true })
    } catch (error: any) {
      set({ 
        registerStatus: 'failed', 
        registerError: error.message || 'Registration failed' 
      })
    }
  }
}))

// 선택자 함수들 (옵션)
export const selectIsLogin = (state: AuthState) => state.isLogin
export const selectUser = (state: AuthState) => state.user
export const selectRegisterStatus = (state: AuthState) => state.registerStatus
export const selectRegisterError = (state: AuthState) => state.registerError