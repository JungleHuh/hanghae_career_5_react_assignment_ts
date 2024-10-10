// src/store/filter/filterStore.ts

import { create } from 'zustand';
import { ALL_CATEGORY_ID } from '@/constants';
import { ProductFilter } from '@/types/productType';

interface FilterState extends ProductFilter {
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
  resetFilter: () => void;
}

const initialState: ProductFilter = {
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setMinPrice: (price: number) => set({ minPrice: price }),
  setMaxPrice: (price: number) => set({ maxPrice: price }),
  setTitle: (title: string) => set({ title }),
  setCategoryId: (categoryId: string) => set({ categoryId }),
  resetFilter: () => set(initialState),
}));

// 선택자 함수들
export const selectMinPrice = (state: FilterState) => state.minPrice;
export const selectMaxPrice = (state: FilterState) => state.maxPrice;
export const selectTitle = (state: FilterState) => state.title;
export const selectCategoryId = (state: FilterState) => state.categoryId;
export const selectFilter = (state: FilterState) => state;

// 사용 예시:
// import { useFilterStore, selectMinPrice, selectMaxPrice } from '@/store/filter/filterStore';
//
// function FilterComponent() {
//   const { setMinPrice, setMaxPrice, resetFilter } = useFilterStore();
//   const minPrice = useFilterStore(selectMinPrice);
//   const maxPrice = useFilterStore(selectMaxPrice);
//
//   // 컴포넌트 로직
// }