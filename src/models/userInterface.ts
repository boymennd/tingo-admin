export type Response = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
};

export type loginForm = {
  username: string;
  password: string;
};

export interface User {
  status: boolean;
  message: number;
  phoneNumber: number;
  email: string;
  token: string;
  userId: string;
  userStatus: string;
  isEnabled2FA: boolean;
}

export interface UserAccount {
  fullName: string;
  email: string;
  role: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  image: string;
}

export interface UserPassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
