import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './slices/authenticationSlice';
import layoutSlice from './slices/layoutSlice';
import loadingSlice from './slices/loadingSlice';
import messageBoxSlice from './slices/messageBoxSlice';
import userInfoSlice from './slices/userInfoSlice';

const store = configureStore({
  reducer: {
    loading: loadingSlice,
    messageBox: messageBoxSlice,
    auth: authSlice,
    userInfo: userInfoSlice,
    layout: layoutSlice,
  },
});

// Types of root state and dispatch
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
