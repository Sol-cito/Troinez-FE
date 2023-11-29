import { Product } from '@/interfaces/product/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartItemStatus {
  cartItemList: CartItem[];
}

const initialState: CartItemStatus = {
  cartItemList: [],
};

export const cartItemSlice = createSlice({
  name: 'cartItemSlice',
  initialState,
  reducers: {
    addToCart: (state = initialState, action: PayloadAction<Product>) => {
      let curList: CartItem[] = state.cartItemList;
      if (!curList) {
        curList = [];
      }
      const matchingCartItem: CartItem | undefined = curList.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );
      if (matchingCartItem) {
        matchingCartItem.quantity += 1;
      } else {
        const newCartItem: CartItem = {
          product: action.payload,
          quantity: 1,
        };
        state.cartItemList = [...curList, newCartItem];
      }
    },
    decreaseItemNumber: (state, action: PayloadAction<Product>) => {
      let curList: CartItem[] = state.cartItemList;
      if (!curList) {
        curList = [];
      }
      const matchingCartItem: CartItem | undefined = curList.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );
      if (matchingCartItem) {
        matchingCartItem.quantity -= 1;
      }
      const filteredCartItemList: CartItem[] = curList.filter((item) => {
        if (item.quantity > 0) {
          return item;
        }
      });
      state.cartItemList = filteredCartItemList;
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      let curList: CartItem[] = state.cartItemList;
      if (!curList) {
        curList = [];
      }
      const matchingCartItem: CartItem | undefined = curList.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );
      if (matchingCartItem) {
        const filteredCartItemList: CartItem[] = curList.filter((item) => {
          if (item.product.id !== action.payload.id) {
            return item;
          }
        });
        state.cartItemList = filteredCartItemList;
      }
    },
  },
});

export const { addToCart, decreaseItemNumber, removeFromCart } =
  cartItemSlice.actions;

export default cartItemSlice;
