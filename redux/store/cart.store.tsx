import { Product } from '@/interfaces/product/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItemStatus {
  productList: Product[];
}

const initialState: CartItemStatus = {
  productList: [],
};

export const cartItemSlice = createSlice({
  name: 'cartItemSlice',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      let curList: Product[] = state.productList;
      state.productList = [...curList, action.payload];
    },
    emptyCart: (state, action: PayloadAction<Product>) => {
      state.productList = [];
    },
  },
});

export const { addToCart, emptyCart } = cartItemSlice.actions;

export default cartItemSlice;
