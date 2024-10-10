/*
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductInfoTableRow } from '@/pages/cart/components/ProductInfoTableRow';
import { selectUser } from '@/store/auth/authSelectors';
import { selectCart } from '@/store/cart/cartSelectors';
import { useAppSelector } from '@/store/hooks';
import { IUser } from '@/types/authType';
import { CartItem } from '@/types/cartType';

export const ProductInfoTable = () => {
  const cart: CartItem[] = useAppSelector(selectCart);
  const user: IUser | null = useAppSelector(selectUser);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이미지</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead>갯수</TableHead>
          <TableHead>가격</TableHead>
          <TableHead>삭제하기</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((item) => (
          <ProductInfoTableRow key={item.id} item={item} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};

*/

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductInfoTableRow } from '@/pages/cart/components/ProductInfoTableRow';
import { useAuthStore } from '@/store/auth/authStore';
import { useCartStore } from '@/store/cart/cartStore';
import { IUser } from '@/types/authType';
import { CartItem } from '@/types/cartType';

export const ProductInfoTable = () => {
  const cart: CartItem[] = useCartStore((state) => state.cart);
  const user: IUser | null = useAuthStore((state) => state.user);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이미지</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead>갯수</TableHead>
          <TableHead>가격</TableHead>
          <TableHead>삭제하기</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((item) => (
          <ProductInfoTableRow key={item.id} item={item} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};

// 선택적: 성능 최적화를 위한 메모이제이션
// import { useMemo } from 'react';
// export const ProductInfoTable = () => {
//   const cart = useCartStore((state) => state.cart);
//   const user = useAuthStore((state) => state.user);
//
//   const memoizedRows = useMemo(() => 
//     cart.map((item) => (
//       <ProductInfoTableRow key={item.id} item={item} user={user} />
//     )),
//     [cart, user]
//   );
//
//   return (
//     <Table>
//       {/* TableHeader는 동일 */}
//       <TableBody>
//         {memoizedRows}
//       </TableBody>
//     </Table>
//   );
// };