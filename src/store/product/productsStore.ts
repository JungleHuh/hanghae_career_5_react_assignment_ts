// src/store/product/productsStore.ts

import { create } from 'zustand';
import { 
  IProduct, 
  NewProductDTO, 
  PaginatedProductsDTO 
} from '@/api/dtos/productDTO';
import { addProductAPI, fetchProducts } from '@/api/product';
import { ProductFilter, ProductSliceState } from '@/types/productType';

interface ProductsState extends ProductSliceState {
  loadProducts: (params: {
    filter: ProductFilter;
    pageSize: number;
    page: number;
    isInitial: boolean;
  }) => Promise<void>;
  addProduct: (productData: NewProductDTO) => Promise<void>;
}

const initialState: ProductSliceState = {
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  ...initialState,

  loadProducts: async ({ filter, pageSize, page, isInitial }) => {
    set({ isLoading: true });
    try {
      const result: PaginatedProductsDTO = await fetchProducts(filter, pageSize, page);
      set((state) => ({
        items: isInitial ? result.products : [...state.items, ...result.products],
        hasNextPage: result.hasNextPage,
        totalCount: result.totalCount,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to load products' });
    }
  },

  addProduct: async (productData: NewProductDTO) => {
    set({ isLoading: true });
    try {
      const newProduct: IProduct = await addProductAPI(productData);
      set((state) => ({
        items: [newProduct, ...state.items],
        totalCount: state.totalCount + 1,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message || '상품 등록에 실패하였습니다.' });
    }
  },
}));

// 선택자 함수들
export const selectProducts = (state: ProductsState) => state.items;
export const selectHasNextPage = (state: ProductsState) => state.hasNextPage;
export const selectIsLoading = (state: ProductsState) => state.isLoading;
export const selectError = (state: ProductsState) => state.error;
export const selectTotalCount = (state: ProductsState) => state.totalCount;

// 사용 예시:
// import { useProductsStore, selectProducts, selectIsLoading } from '@/store/product/productsStore';
//
// function ProductList() {
//   const { loadProducts, addProduct } = useProductsStore();
//   const products = useProductsStore(selectProducts);
//   const isLoading = useProductsStore(selectIsLoading);
//
//   useEffect(() => {
//     loadProducts({ filter: {}, pageSize: 10, page: 1, isInitial: true });
//   }, []);
//
//   // ... 컴포넌트 로직
// }