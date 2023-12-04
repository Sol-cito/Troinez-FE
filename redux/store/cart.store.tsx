import { Product } from '@/interfaces/product/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  product: Product;
  quantity: number;
  checked: boolean;
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
          checked: true,
        };
        state.cartItemList = [...curList, newCartItem];
      }
    },
    checkAllCartItems: (
      state = initialState,
      action: PayloadAction<Product>
    ) => {
      let curList: CartItem[] = state.cartItemList;
      curList.forEach((item) => {
        item.checked = true;
      });
    },
    changeCartItemCheck: (
      state = initialState,
      action: PayloadAction<Product>
    ) => {
      let curList: CartItem[] = state.cartItemList;

      const matchingCartItem: CartItem | undefined = curList.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );
      if (matchingCartItem) {
        matchingCartItem.checked = !matchingCartItem.checked;
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

export const {
  addToCart,
  checkAllCartItems,
  changeCartItemCheck,
  decreaseItemNumber,
  removeFromCart,
} = cartItemSlice.actions;

export default cartItemSlice;
