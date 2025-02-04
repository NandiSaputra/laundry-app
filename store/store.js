import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customersReducer from "./customersSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
  },
});

export default store;
