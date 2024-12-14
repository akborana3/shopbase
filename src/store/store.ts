import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    theme: themeReducer,
    auth: authReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;