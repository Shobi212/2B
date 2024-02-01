// modalSlice.js

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isLoginVisible: false,
    isLoginAlertVisible: false,
  },
  reducers: {
    showLoginModal: (state) => {
      state.isLoginVisible = true;
    },
    hideLoginModal: (state) => {
      state.isLoginVisible = false;
    },
    showLoginAlertModal: (state) => {
      state.isLoginAlertVisible = true;
    },
    hideLoginAlertModal: (state) => {
      state.isLoginAlertVisible = false;
    },
  },
});

export const {
  showLoginModal,
  hideLoginModal,
  showLoginAlertModal,
  hideLoginAlertModal,
} = modalSlice.actions;

export const selectLoginModalVisibility = (state) => state.modal.isLoginVisible;
// export const loginAlertModalVisibility = (state) => state.modal.isLoginAlertVisible;

export default modalSlice.reducer;
