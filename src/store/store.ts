import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// Types of root state and dispatch
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
