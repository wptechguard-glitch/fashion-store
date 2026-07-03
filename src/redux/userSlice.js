import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoggedIn: !!localStorage.getItem("fs_token"),
  token: localStorage.getItem("fs_token") || null,
  orders: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = user;
      state.isLoggedIn = true;
      if (token) {
        state.token = token;
        localStorage.setItem("fs_token", token);
      }
      state.error = null;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.token = null;
      state.orders = [];
      state.error = null;
      localStorage.removeItem("fs_token");
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setOrders, addOrder, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
