import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "Login",
  initialState: {
    isLoggedIn: false,
    userDetail: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userDetail = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userDetail = null;
    },
  },
});
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
