import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

const Store = configureStore({
  reducer: rootReducer,
});
export default Store;
