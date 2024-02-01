import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slice/LoginSlice";
import modalReducer from "./slice/ModalSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
});
export default rootReducer;
