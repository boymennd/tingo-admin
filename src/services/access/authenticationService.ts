import { objectNullOrEmpty } from '../../utils/utils';
import { authentication } from '../../adapters/authen-adapter';
import { getAccessToken, removeAccessToken } from '../../adapters/sessionStore';

//use isLogin set login status in order to use list user in local storage (in demo project)

export const AuthenticationService = {
  isLogin,
  login,
  logout,
  getCurrentUser,
  geUserLocalStorage,
};

function geUserLocalStorage() {
  const userInfo: string | null = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return [];
}

function getCurrentUser() {
  const currentUser: string | null = localStorage.getItem('currentUser');
  if (currentUser) {
    return JSON.parse(currentUser);
  }
  return {};
}

async function login(username: string, password: string) {
  // handle call api authentication
  const loginData = await authentication({
    username: username,
    password: password,
  });

  if (!objectNullOrEmpty(loginData)) {
    return loginData;
  }
}

function logout() {
  removeAccessToken();
}

function isLogin() {
  const access_token = getAccessToken();
  return !!access_token;
}
