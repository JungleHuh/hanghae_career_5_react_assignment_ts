/*
import { CartTable } from '@/pages/cart/components/CartTable';
import { EmptyNotice } from '@/pages/cart/components/EmptyNotice';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import { selectCart } from '@/store/cart/cartSelectors';
import { useAppSelector } from '@/store/hooks';

export const Cart = () => {
  const cart = useAppSelector(selectCart);
  const isExist = cart.length > 0;

  return (
    <Layout
      containerClassName="p-2.5 flex flex-col"
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};

*/

import { CartTable } from '@/pages/cart/components/CartTable';
import { EmptyNotice } from '@/pages/cart/components/EmptyNotice';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import { useCartStore } from '@/store/cart/cartStore';

export const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const isExist = cart.length > 0;

  return (
    <Layout
      containerClassName="p-2.5 flex flex-col"
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};

// 선택적: 성능 최적화를 위한 메모이제이션
// import { useMemo } from 'react';
// export const Cart = () => {
//   const cart = useCartStore((state) => state.cart);
//   
//   const content = useMemo(() => {
//     const isExist = cart.length > 0;
//     return isExist ? <CartTable /> : <EmptyNotice />;
//   }, [cart]);
//
//   return (
//     <Layout
//       containerClassName="p-2.5 flex flex-col"
//       authStatus={authStatusType.NEED_LOGIN}
//     >
//       {content}
//     </Layout>
//   );
// };