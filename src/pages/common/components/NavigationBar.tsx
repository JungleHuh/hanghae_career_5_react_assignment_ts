/*
import Cookies from 'js-cookie';
import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';
import { logout } from '@/store/auth/authSlice';
import { initCart } from '@/store/cart/cartSlice';

import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CartButton } from './CartButton';
import { ConfirmModal } from './ConfirmModal';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const { isLogin, user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (isLogin && user && cart.length === 0) {
      dispatch(initCart(user.uid));
    }
  }, [isLogin, user, dispatch, cart.length]);

  const handleLogout = () => {
    openModal();
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    Cookies.remove('accessToken');
    closeModal();
  };

  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={handleClickLogo}
            >
              스파르타 마트
            </h1>
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense fallback={<Skeleton className="w-24 h-8" />}>
                    <CartButton cart={cart} />
                    <LogoutButton onClick={handleLogout} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </nav>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={closeModal}
        handleClickAgree={handleConfirmLogout}
        isModalOpened={isOpen}
      />
    </>
  );
};

*/

import Cookies from 'js-cookie';
import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '@/apiRoutes';
import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';
import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/hooks/useModal';
import { useAuthStore } from '@/store/auth/authStore';
import { useCartStore } from '@/store/cart/cartStore';
import { CartButton } from './CartButton';
import { ConfirmModal } from './ConfirmModal';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  
  const { isLogin, user, logout } = useAuthStore();
  const { cart, initCart } = useCartStore();

  useEffect(() => {
    if (isLogin && user && cart.length === 0) {
      initCart(user.uid);
    }
  }, [isLogin, user, cart.length, initCart]);

  const handleLogout = () => {
    openModal();
  };

  const handleConfirmLogout = () => {
    logout();
    Cookies.remove('accessToken');
    closeModal();
  };

  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={handleClickLogo}
            >
              스파르타 마트
            </h1>
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense fallback={<Skeleton className="w-24 h-8" />}>
                    <CartButton cart={cart} />
                    <LogoutButton onClick={handleLogout} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </nav>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={closeModal}
        handleClickAgree={handleConfirmLogout}
        isModalOpened={isOpen}
      />
    </>
  );
};

// 선택적: 성능 최적화를 위한 메모이제이션
// import { useMemo } from 'react';
// export const NavigationBar = () => {
//   // ... 기존 코드
//
//   const navContent = useMemo(() => (
//     <div className="flex items-center space-x-4">
//       {isLogin ? (
//         <ApiErrorBoundary>
//           <Suspense fallback={<Skeleton className="w-24 h-8" />}>
//             <CartButton cart={cart} />
//             <LogoutButton onClick={handleLogout} />
//           </Suspense>
//         </ApiErrorBoundary>
//       ) : (
//         <LoginButton />
//       )}
//     </div>
//   ), [isLogin, cart, handleLogout]);
//
//   return (
//     <>
//       <nav className="fixed top-0 w-full bg-white shadow-md z-50">
//         {/* ... 기존 코드 */}
//         {navContent}
//         {/* ... 기존 코드 */}
//       </nav>
//       <ConfirmModal
//         {/* ... 기존 코드 */}
//       />
//     </>
//   );
// };