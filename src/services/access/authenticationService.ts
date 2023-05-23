import { objectNullOrEmpty, stringNullOrEmpty } from '../../utils/utils';
import { User, loginForm } from '../../models/userInterface';
import lstUserJSON from '../../fakeData/user.json';
import { authentication } from '../../adapters/authen-adapter';

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

async function login(payload: loginForm) {
  try {
    const response = await authentication(payload);
    return response;
  } catch (error) {
    throw error;
  }
  // const lstUser: any = localStorage.getItem('lstUser');
  // const lstUserDefault = lstUserJSON.map((user: any) => {
  // 	return user;
  // });
  // const lstUserCheck = !stringNullOrEmpty(lstUser)
  // 	? JSON.parse(lstUser)
  // 	: lstUserDefault;
  // // handle call api authentication
  // const currentUser: any = lstUserCheck.find(
  // 	(it: User) => it.username === username && it.password === password
  // );
  // if (!objectNullOrEmpty(currentUser)) {
  // 	// save token to localStorage
  // 	currentUser.validTo = new Date().getTime() + 1000 * 900;
  // 	currentUser.isLogin = true;
  // 	localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // 	// if (!lstUser) {
  // 	//   localStorage.setItem('lstUser', JSON.stringify(lstUserDefault));
  // 	// }
  // 	// //save list user to local storage
  // 	return currentUser;
  // }
}

function logout() {
  const currentUser = getCurrentUser();
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
