import { objectNullOrEmpty, stringNullOrEmpty } from '../../utils/utils';
import { User, loginForm } from '../../models/userInterface';
import lstUserJSON from '../../fakeData/user.json';
import { authentication } from '../../adapters/authen-adapter';
import { removeAccessToken } from '../../adapters/sessionStore';

//use isLogin set login status in order to use list user in local storage (in demo project)

export const AuthenticationService = {
  isLogin,
  login,
  logout,
  getCurrentUser,
  getListUserLocalStorage,
};

function getListUserLocalStorage() {
  const lstUser: string | null = localStorage.getItem('lstUser');
  if (lstUser) {
    return JSON.parse(lstUser);
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
  const lstUser: any = localStorage.getItem('lstUser');
  const lstUserDefault = lstUserJSON.map((user: any) => {
    return user;
  });
  const lstUserCheck = !stringNullOrEmpty(lstUser)
    ? JSON.parse(lstUser)
    : lstUserDefault;
  // handle call api authentication
  const loginData = await authentication({
    username: username,
    password: password,
  });
  console.log({ loginData });

  if (!objectNullOrEmpty(loginData)) {
    // save token to localStorage
    console.log({ loginData });

    // if (!lstUser) {
    //   localStorage.setItem('lstUser', JSON.stringify(lstUserDefault));
    // }
    // //save list user to local storage
    return loginData;
  }
}

function logout() {
  const currentUser = getCurrentUser();
  removeAccessToken();
  if (objectNullOrEmpty(currentUser)) {
    return;
  }
  currentUser.isLogin = false;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // localStorage.removeItem('currentUser');
}

function isLogin() {
  const currentUser = getCurrentUser();
  if (!objectNullOrEmpty(currentUser)) {
    let nowTime = new Date().getTime();
    return (
      currentUser.accessToken &&
      nowTime < currentUser.validTo &&
      currentUser.isLogin
    );
  }
  return false;
}
