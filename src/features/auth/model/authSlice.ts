import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialState {
  isAuth: boolean;
  isAdmin: boolean;
  isActivated: boolean;
}

const initialState: initialState = {
  isAuth: false,
  isAdmin: false,
  isActivated: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, actions: PayloadAction<boolean>) => {
      state.isAuth = actions.payload;
    },
    setAdmin: (state, actions: PayloadAction<boolean>) => {
      state.isAdmin = actions.payload;
    },
    setActivate: (state, actions: PayloadAction<boolean>) => {
      state.isActivated = actions.payload;
    },
  },
});

export const { setAuth, setAdmin, setActivate } = authSlice.actions;
