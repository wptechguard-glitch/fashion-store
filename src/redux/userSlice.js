import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { loginUser, logoutUser, addOrder } = userSlice.actions;
export default userSlice.reducer;
