/*
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { useAppSelector } from '@/store/hooks';
import { NavigationBar } from './NavigationBar';

export const authStatusType = {
  NEED_LOGIN: 'NEED_LOGIN',
  NEED_NOT_LOGIN: 'NEED_NOT_LOGIN',
  COMMON: 'COMMON',
};

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
  authStatus?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName = '',
  authStatus = authStatusType.COMMON,
}) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} />;
  }

  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col min-h-screen mt-24">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

*/

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { pageRoutes } from '@/apiRoutes';
import { useAuthStore } from '@/store/auth/authStore';
import { NavigationBar } from './NavigationBar';

export const authStatusType = {
  NEED_LOGIN: 'NEED_LOGIN',
  NEED_NOT_LOGIN: 'NEED_NOT_LOGIN',
  COMMON: 'COMMON',
} as const;

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
  authStatus?: keyof typeof authStatusType;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName = '',
  authStatus = authStatusType.COMMON,
}) => {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }
  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} />;
  }

  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col min-h-screen mt-24">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// 선택적: 성능 최적화를 위한 메모이제이션
// import { useMemo } from 'react';
// export const Layout: React.FC<LayoutProps> = ({
//   children,
//   containerClassName = '',
//   authStatus = authStatusType.COMMON,
// }) => {
//   const isLogin = useAuthStore((state) => state.isLogin);
//
//   const content = useMemo(() => {
//     if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
//       return <Navigate to={pageRoutes.login} />;
//     }
//     if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
//       return <Navigate to={pageRoutes.main} />;
//     }
//     return (
//       <div>
//         <NavigationBar />
//         <div className="flex flex-col min-h-screen mt-24">
//           <main className="flex-grow">
//             <div className={`container mx-auto px-4 ${containerClassName}`}>
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }, [isLogin, authStatus, containerClassName, children]);
//
//   return content;
// };