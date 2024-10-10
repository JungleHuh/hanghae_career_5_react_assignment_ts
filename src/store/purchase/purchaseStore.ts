// src/store/purchase/purchaseStore.ts

import { create } from 'zustand';

interface PurchaseState {
  isLoading: boolean;
  error: string | null;
  purchaseStart: () => void;
  purchaseSuccess: () => void;
  purchaseFailure: (error: string) => void;
}

export const usePurchaseStore = create<PurchaseState>((set) => ({
  isLoading: false,
  error: null,

  purchaseStart: () => set({ isLoading: true, error: null }),
  
  purchaseSuccess: () => set({ isLoading: false, error: null }),
  
  purchaseFailure: (error: string) => set({ isLoading: false, error }),
}));

// 선택자 함수들 (옵션)
export const selectPurchaseLoading = (state: PurchaseState) => state.isLoading;
export const selectPurchaseError = (state: PurchaseState) => state.error;

// 사용 예시:
// import { usePurchaseStore, selectPurchaseLoading, selectPurchaseError } from '@/store/purchase/purchaseStore';
//
// function PurchaseComponent() {
//   const { purchaseStart, purchaseSuccess, purchaseFailure } = usePurchaseStore();
//   const isLoading = usePurchaseStore(selectPurchaseLoading);
//   const error = usePurchaseStore(selectPurchaseError);
//
//   const handlePurchase = async () => {
//     purchaseStart();
//     try {
//       // 구매 로직 실행
//       await executePurchase();
//       purchaseSuccess();
//     } catch (error) {
//       purchaseFailure(error.message);
//     }
//   };
//
//   // ... 컴포넌트 로직
// }