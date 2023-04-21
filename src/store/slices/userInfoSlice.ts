import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type permissionType = {
	view: boolean;
	edit: boolean;
};

type UserType = {
	username?: string;
	fullName?: string;
	email?: string;
	phone?: string;
	role?: string;
	isLogin: boolean;
	permission?: permissionType;
};

type State = {
	userInfo: UserType;
};

const initialState: State = {
	userInfo: {
		username: '',
		fullName: '',
		email: '',
		phone: '',
		role: '',
		isLogin: false,
		permission: {
			view: false,
			edit: false,
		},
	},
};

export const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		setUserInfo: (state: State, action: PayloadAction<UserType>) => {
			state.userInfo = action.payload;
		},
	},
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
