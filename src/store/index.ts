// src/store/index.ts

import { useAuthStore } from './auth/authStore';
import { useCartStore } from './cart/cartStore';
import { useFilterStore } from './filter/filterStore';
import { useProductsStore } from './product/productsStore';
import { usePurchaseStore } from './purchase/purchaseStore';

export {
  useAuthStore,
  useCartStore,
  useFilterStore,
  useProductsStore,
  usePurchaseStore
};

// 옵션: 타입 정의를 여기에 포함시킬 수 있습니다.
export type RootState = {
  auth: ReturnType<typeof useAuthStore.getState>;
  cart: ReturnType<typeof useCartStore.getState>;
  filter: ReturnType<typeof useFilterStore.getState>;
  products: ReturnType<typeof useProductsStore.getState>;
  purchase: ReturnType<typeof usePurchaseStore.getState>;
};

// 사용 예시:
// import { useCartStore, useAuthStore } from '@/store';
//
// function SomeComponent() {
//   const { cart, addCartItem } = useCartStore();
//   const { user } = useAuthStore();
//   // ... 컴포넌트 로직
// }