// src/hooks/useStore.ts

import { useAuthStore, useCartStore, useFilterStore, useProductsStore, usePurchaseStore } from '@/store';

// 각 스토어의 타입을 정의합니다
type AuthState = ReturnType<typeof useAuthStore>;
type CartState = ReturnType<typeof useCartStore>;
type FilterState = ReturnType<typeof useFilterStore>;
type ProductsState = ReturnType<typeof useProductsStore>;
type PurchaseState = ReturnType<typeof usePurchaseStore>;

// 전체 애플리케이션 상태 타입
export type RootState = {
  auth: AuthState;
  cart: CartState;
  filter: FilterState;
  products: ProductsState;
  purchase: PurchaseState;
};

// 선택적: 타입 안전성을 위한 커스텀 훅
export function useTypedStore<T>(store: (selector: (state: T) => any) => any) {
  return <U>(selector: (state: T) => U) => store(selector);
}

// 사용 예시:
// import { useAuthStore, useCartStore } from '@/store';
// import { RootState, useTypedStore } from '@/hooks/useStore';
//
// function SomeComponent() {
//   const useTypedAuthStore = useTypedStore<RootState['auth']>(useAuthStore);
//   const useTypedCartStore = useTypedStore<RootState['cart']>(useCartStore);
//
//   const user = useTypedAuthStore(state => state.user);
//   const addToCart = useTypedCartStore(state => state.addCartItem);
//
//   // ... 컴포넌트 로직
// }