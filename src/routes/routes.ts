import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const UserManagement = lazy(
  () => import('../pages/userManagement/UserManagement')
);
const UserProfilePage = lazy(() => import('../pages/userProfile/UserProfile'));
const Page404 = lazy(() => import('../pages/404/404'));
const UserList = lazy(() => import('../pages/UserList/UserList'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const Login = lazy(() => import('../pages/authentication/Login'));
const Signup = lazy(() => import('../pages/authentication/Signup'));
const ForgotPassword = lazy(
  () => import('../pages/authentication/ForgotPassword')
);

const privateRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/user-management', component: UserManagement, checkRole: true },
  { path: '/profile', component: Profile },
  { path: '/user-list', component: UserList, checkPermission: true },
  { path: '/user-profile', component: UserProfilePage, checkPermission: true },
  { path: '/404', component: Page404 },
  { path: '*', component: Dashboard },
];

const publicRoutes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '*', component: Login },
];

export { privateRoutes, publicRoutes };
