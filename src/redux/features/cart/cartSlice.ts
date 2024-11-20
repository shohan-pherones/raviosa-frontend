import { IProduct } from "@/src/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface CartItem extends IProduct {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  shippingCost: number;
  tax: number;
  subtotal: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  shippingCost: 0,
  tax: 0,
  subtotal: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        toast.success("Quantity updated for the existing item in your cart.");
      } else {
        state.items.push(action.payload);
        toast.success("Item added to your cart successfully!");
      }

      cartSlice.caseReducers.calculateSubtotal(state);
      cartSlice.caseReducers.calculateTax(state);
      cartSlice.caseReducers.calculateShippingCost(state);
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      toast.success("Item removed from your cart.");

      cartSlice.caseReducers.calculateSubtotal(state);
      cartSlice.caseReducers.calculateTax(state);
      cartSlice.caseReducers.calculateShippingCost(state);
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    clearCart: (state) => {
      state.items = [];
      toast.success("Your cart has been cleared. All items removed.");

      state.subtotal = 0;
      state.tax = 0;
      state.shippingCost = 0;
      state.totalPrice = 0;
    },
    calculateSubtotal: (state) => {
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    calculateTax: (state) => {
      const taxRate = 0.05;
      state.tax = state.subtotal * taxRate;
    },
    calculateShippingCost: (state) => {
      const baseShippingCost = 5;
      const mediumShippingCost = 10;

      if (state.subtotal <= 100) {
        state.shippingCost = baseShippingCost;
      } else if (state.subtotal <= 500) {
        state.shippingCost = mediumShippingCost;
      } else {
        state.shippingCost = 0;
      }
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state.subtotal + state.tax + state.shippingCost;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
