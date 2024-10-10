/*
import { pageRoutes } from '@/apiRoutes';
import { Button } from '@/components/ui/button';
import { selectTotalCount, selectTotalPrice } from '@/store/cart/cartSelectors';
import { useAppSelector } from '@/store/hooks';
import { formatNumber, formatPrice } from '@/utils/formatter';
import { useNavigate } from 'react-router-dom';

export const PriceSummary = () => {
  const navigate = useNavigate();
  const totalCount = useAppSelector(selectTotalCount);
  const totalPrice = useAppSelector(selectTotalPrice);

  const handleClickPurchase = () => {
    navigate(pageRoutes.purchase);
  };

  return (
    <div className="pt-4 flex flex-col items-end">
      <p>
        총 {formatNumber(totalCount)}개, {formatPrice(totalPrice)}
      </p>
      <Button onClick={handleClickPurchase} className="mt-2">
        구매하기
      </Button>
    </div>
  );
};

*/


import { pageRoutes } from '@/apiRoutes';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart/cartStore';
import { formatNumber, formatPrice } from '@/utils/formatter';
import { useNavigate } from 'react-router-dom';

export const PriceSummary = () => {
  const navigate = useNavigate();
  const totalCount = useCartStore((state) => state.totalCount);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleClickPurchase = () => {
    navigate(pageRoutes.purchase);
  };

  return (
    <div className="pt-4 flex flex-col items-end">
      <p>
        총 {formatNumber(totalCount)}개, {formatPrice(totalPrice)}
      </p>
      <Button onClick={handleClickPurchase} className="mt-2">
        구매하기
      </Button>
    </div>
  );
};

// 선택적: 성능 최적화를 위한 메모이제이션
// import { useMemo } from 'react';
// export const PriceSummary = () => {
//   const navigate = useNavigate();
//   const { totalCount, totalPrice } = useCartStore((state) => ({
//     totalCount: state.totalCount,
//     totalPrice: state.totalPrice,
//   }));
//
//   const formattedSummary = useMemo(() => ({
//     count: formatNumber(totalCount),
//     price: formatPrice(totalPrice),
//   }), [totalCount, totalPrice]);
//
//   // ... 나머지 코드는 동일
// };