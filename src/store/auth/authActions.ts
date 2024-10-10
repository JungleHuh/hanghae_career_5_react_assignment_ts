/*
import { registerUserAPI } from '@/api/auth';
import { IUser } from '@/types/authType';
import { createAsyncThunk } from '@reduxjs/toolkit';
//변경
interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
}

export const registerUser = createAsyncThunk<
  IUser,
  RegisterUserPayload,
  { rejectValue: string }
>(
  'auth/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      return await registerUserAPI({ email, password, name });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
*/

/*
import { create } from 'zustand'
import { registerUserAPI } from '@/api/auth'
import { IUser } from '@/types/authType'

interface RegisterUserPayload {
  email: string
  password: string
  name: string
}

interface AuthState {
  user: IUser | null
  isLoading: boolean
  error: string | null
  registerUser: (payload: RegisterUserPayload) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  registerUser: async (payload: RegisterUserPayload) => {
    set({ isLoading: true, error: null })
    try {
      const user = await registerUserAPI(payload)
      set({ user, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },
}))

// 사용 예시:
// const { registerUser, user, isLoading, error } = useAuthStore()
// 
// const handleRegister = async () => {
//   await registerUser({ email, password, name })
// }
*/