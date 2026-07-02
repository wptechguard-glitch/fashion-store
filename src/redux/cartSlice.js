import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  couponApplied: false,
  couponCode: "",
  discountPercentage: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size, color, quantity = 1 } = action.payload;
      // Look for match of id, size, and color
      const existingIndex = state.items.findIndex(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      );
    },
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );
      if (existing) {
        existing.quantity = Math.max(1, quantity);
      }
    },
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();
      if (code === "FASHION10") {
        state.couponApplied = true;
        state.couponCode = "FASHION10";
        state.discountPercentage = 10;
      } else if (code === "LUXURY20") {
        state.couponApplied = true;
        state.couponCode = "LUXURY20";
        state.discountPercentage = 20;
      } else {
        state.couponApplied = false;
        state.couponCode = "";
        state.discountPercentage = 0;
      }
    },
    removeCoupon: (state) => {
      state.couponApplied = false;
      state.couponCode = "";
      state.discountPercentage = 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.couponApplied = false;
      state.couponCode = "";
      state.discountPercentage = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
