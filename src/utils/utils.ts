import { AuthenticationService } from '../services/access/authenticationService';
import { USER_ROLE } from './enum/commonEnum';
import jwtDecode from 'jwt-decode';
import { TokenInfo } from '../models/tokenInfo';

export const getDecodedAccessToken = (accessToken: string) => {
  return jwtDecode<TokenInfo>(accessToken);
};

export const onChange = (setValues: any, values: Object, event: any) => {
  const value = event.target.value;
  setValues({ ...values, [event.target.name]: value });
};

export const onChangeDate = (
  setValues: any,
  values: Object,
  fieldName: string,
  value: any
) => {
  setValues({ ...values, [fieldName]: value });
};

export const convertDate = (date: any) => {
  if (date === null) return '';
  return new Date(date * 1000).toLocaleDateString();
};

//return true if object is undefined || null || ""
export const stringNullOrEmpty = (string: any) => {
  return (
    string === undefined ||
    string === null ||
    string === '' ||
    string === 'Invalid date'
  );
};

//return true if object is undefined || null || {}
export const objectNullOrEmpty = (object: object) => {
  if (object === undefined || object === null) {
    return true;
  } else {
    for (let key in object) {
      if (object.hasOwnProperty(key)) return false;
    }
    return true;
  }
};

export const viewPermission = () => {
  const currentUser = AuthenticationService.getCurrentUser();
  return !objectNullOrEmpty(currentUser) && currentUser.permission.view;
};

export const editPermission = () => {
  const currentUser = AuthenticationService.getCurrentUser();
  return !objectNullOrEmpty(currentUser) && currentUser.permission.edit;
};

export const adminRole = () => {
  const currentUser = AuthenticationService.getCurrentUser();
  return (
    !objectNullOrEmpty(currentUser) && USER_ROLE.ADMIN === currentUser.role
  );
};

export const userRole = () => {
  const currentUser = AuthenticationService.getCurrentUser();
  return !objectNullOrEmpty(currentUser) && USER_ROLE.USER === currentUser.role;
};
