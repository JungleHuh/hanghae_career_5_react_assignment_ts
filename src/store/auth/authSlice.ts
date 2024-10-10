/*
import { IUser } from '@/types/authType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from './authActions';
//변경
interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  registerError: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.registerStatus = 'succeeded';
          state.user = action.payload;
          state.isLogin = true;
        }
      )
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.registerStatus = 'failed';
          state.registerError = action.payload || 'Registration failed';
        }
      );
  },
});

export const { setIsLogin, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
*/

/*
import { create } from 'zustand'
import { IUser } from '@/types/authType'
import { registerUserAPI } from '@/api/auth';


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
}
)
)

// 사용 예시:
// const { isLogin, user, registerStatus, registerError, setIsLogin, setUser, logout, registerUser } = useAuthStore()
*/