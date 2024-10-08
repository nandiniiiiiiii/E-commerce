import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/productList/productSlice'
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/CartSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
  },
});