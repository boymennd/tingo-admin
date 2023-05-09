import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthenticationService } from '../services/access/authenticationService';
import { useEffect } from 'react';
import RolePermissionPage from './RolePermissionPage';
import { privateRoutes, publicRoutes } from './routes';
import Layout from '../layouts/Layout';
import { useAppSelector } from '../store/store';

const ContainerRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useAppSelector((state) => state.userInfo);
  const { isLogin } = userInfo;
  const activeRoutes = isLogin ? privateRoutes : publicRoutes;

  useEffect(() => {
    if (!isLogin) {
      if (!publicRoutes.find((route) => route.path === location?.pathname)) {
        navigate('/login');
      }
    } else {
      if (!privateRoutes.find((route) => route.path === location?.pathname)) {
        navigate('/404');
      }
    }
  }, [isLogin, location?.pathname]);

  return (
    <Routes>
      {activeRoutes.map((route: any, index: any) => {
        const Page = route.component;
        // const checkPermission = route.checkPermission;
        // const checkRole = route.checkRole;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              isLogin ? (
                <Layout>
                  <RolePermissionPage route={route} />
                </Layout>
              ) : (
                <Page />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default ContainerRouter;
