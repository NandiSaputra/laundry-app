import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customersReducer from "./customersSlice";
import productReducer from "./productSlice";
import billsReducer from "./billSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    products: productReducer,
    bills: billsReducer,
  },
});

export default store;
