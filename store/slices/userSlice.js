import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  mealplan: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    setMealPlanner: (state, action) => {
      state.mealplan = action.payload;
    },
  },
});

export const { setUserInfo, logout, setMealPlanner } = userSlice.actions;

export default userSlice.reducer;
