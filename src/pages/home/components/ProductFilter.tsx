/*
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';
import {
  setCategoryId,
  setMaxPrice,
  setMinPrice,
  setTitle,
} from '@/store/filter/filterActions';
import { selectFilter } from '@/store/filter/filterSelectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { debounce } from '@/utils/common';
import { CategoryRadioGroup } from './CategoryRadioGroup';
import { PriceRange } from './PriceRange';
import { SearchBar } from './SearchBar';

interface ProductFilterBoxProps {
  children: React.ReactNode;
}

const ProductFilterBox: React.FC<ProductFilterBoxProps> = ({ children }) => (
  <Card className="my-4">
    <CardContent>{children}</CardContent>
  </Card>
);

export const ProductFilter = () => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(selectFilter);

  const handleChangeInput = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTitle(e.target.value));
    },
    300
  );

  const handlePriceChange = (
    actionCreator: typeof setMinPrice | typeof setMaxPrice
  ) =>
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '') {
        dispatch(actionCreator(-1));
      } else {
        const numericValue = Math.max(0, parseInt(value, 10));
        if (!isNaN(numericValue)) {
          dispatch(actionCreator(numericValue));
        }
      }
    }, 300);

  const handleMinPrice = handlePriceChange(setMinPrice);
  const handleMaxPrice = handlePriceChange(setMaxPrice);

  const handleChangeCategory = (value: string) => {
    if (value !== undefined) {
      dispatch(setCategoryId(value));
    } else {
      console.error('카테고리가 설정되지 않았습니다.');
    }
  };

  return (
    <div className="space-y-4">
      <ProductFilterBox>
        <SearchBar onChangeInput={handleChangeInput} />
      </ProductFilterBox>
      <ProductFilterBox>
        <ApiErrorBoundary>
          <Suspense fallback={<Loader2 className="h-24 w-24 animate-spin" />}>
            <CategoryRadioGroup
              categoryId={filterState.categoryId}
              onChangeCategory={handleChangeCategory}
            />
          </Suspense>
        </ApiErrorBoundary>
      </ProductFilterBox>
      <ProductFilterBox>
        <PriceRange
          onChangeMinPrice={handleMinPrice}
          onChangeMaxPrice={handleMaxPrice}
        />
      </ProductFilterBox>
    </div>
  );
};

*/

import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';
import { useFilterStore } from '@/store/filter/filterStore';
import { debounce } from '@/utils/common';
import { CategoryRadioGroup } from './CategoryRadioGroup';
import { PriceRange } from './PriceRange';
import { SearchBar } from './SearchBar';

interface ProductFilterBoxProps {
  children: React.ReactNode;
}

const ProductFilterBox: React.FC<ProductFilterBoxProps> = ({ children }) => (
  <Card className="my-4">
    <CardContent>{children}</CardContent>
  </Card>
);

export const ProductFilter = () => {
  const { 
    setTitle, 
    setMinPrice, 
    setMaxPrice, 
    setCategoryId, 
    categoryId 
  } = useFilterStore();

  const handleChangeInput = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    300
  );

  const handlePriceChange = (
    actionCreator: (price: number) => void
  ) =>
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '') {
        actionCreator(-1);
      } else {
        const numericValue = Math.max(0, parseInt(value, 10));
        if (!isNaN(numericValue)) {
          actionCreator(numericValue);
        }
      }
    }, 300);

  const handleMinPrice = handlePriceChange(setMinPrice);
  const handleMaxPrice = handlePriceChange(setMaxPrice);

  const handleChangeCategory = (value: string) => {
    if (value !== undefined) {
      setCategoryId(value);
    } else {
      console.error('카테고리가 설정되지 않았습니다.');
    }
  };

  return (
    <div className="space-y-4">
      <ProductFilterBox>
        <SearchBar onChangeInput={handleChangeInput} />
      </ProductFilterBox>
      <ProductFilterBox>
        <ApiErrorBoundary>
          <Suspense fallback={<Loader2 className="h-24 w-24 animate-spin" />}>
            <CategoryRadioGroup
              categoryId={categoryId}
              onChangeCategory={handleChangeCategory}
            />
          </Suspense>
        </ApiErrorBoundary>
      </ProductFilterBox>
      <ProductFilterBox>
        <PriceRange
          onChangeMinPrice={handleMinPrice}
          onChangeMaxPrice={handleMaxPrice}
        />
      </ProductFilterBox>
    </div>
  );
};

// 선택적: 성능 최적화를 위한 메모이제이션
// import { useMemo, useCallback } from 'react';
// export const ProductFilter = () => {
//   const { 
//     setTitle, 
//     setMinPrice, 
//     setMaxPrice, 
//     setCategoryId, 
//     categoryId 
//   } = useFilterStore();
//
//   const handleChangeInput = useCallback(
//     debounce((e: React.ChangeEvent<HTMLInputElement>) => {
//       setTitle(e.target.value);
//     }, 300),
//     [setTitle]
//   );
//
//   const handlePriceChange = useCallback(
//     (actionCreator: (price: number) => void) =>
//       debounce((e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         if (value === '') {
//           actionCreator(-1);
//         } else {
//           const numericValue = Math.max(0, parseInt(value, 10));
//           if (!isNaN(numericValue)) {
//             actionCreator(numericValue);
//           }
//         }
//       }, 300),
//     []
//   );
//
//   const handleMinPrice = useMemo(() => handlePriceChange(setMinPrice), [handlePriceChange, setMinPrice]);
//   const handleMaxPrice = useMemo(() => handlePriceChange(setMaxPrice), [handlePriceChange, setMaxPrice]);
//
//   const handleChangeCategory = useCallback((value: string) => {
//     if (value !== undefined) {
//       setCategoryId(value);
//     } else {
//       console.error('카테고리가 설정되지 않았습니다.');
//     }
//   }, [setCategoryId]);
//
//   // ... 나머지 렌더링 로직은 동일
// };