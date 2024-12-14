import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { products as initialProductsData } from '../../data/products';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: initialProductsData,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;