/*
import router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { store } from './store';
// 변경(Provider 제거)

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {isDevEnvironment && <ReactQueryDevtools />}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
} else {
  console.error('Failed to find the root element.');
}

*/

import router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const queryClient = new QueryClient();
const isDevEnvironment = import.meta.env.DEV;

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      {isDevEnvironment && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
} else {
  console.error('Failed to find the root element.');
}

// 옵션: Zustand 스토어 초기화 (필요한 경우)
// import { useAuthStore } from '@/store/auth/authStore';
// import { useCartStore } from '@/store/cart/cartStore';
// 
// // 애플리케이션 시작 시 필요한 초기 데이터 로드
// useAuthStore.getState().initializeAuth();
// useCartStore.getState().initializeCart();