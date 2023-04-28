import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MenuOpenState = {
  menuOpen: boolean;
};

const initialState: MenuOpenState = {
  menuOpen: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    changeMenu: (state: MenuOpenState, action: PayloadAction<boolean>) => {
      state.menuOpen = action.payload;
    },
  },
});

export const { changeMenu } = layoutSlice.actions;

export default layoutSlice.reducer;
