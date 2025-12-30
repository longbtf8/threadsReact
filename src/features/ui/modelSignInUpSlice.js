import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isModelOpen: false,
};
export const modelSignInUpSlice = createSlice({
  name: "modelSignInUp",
  initialState,
  reducers: {
    openSignInUp: (state) => {
      state.isModelOpen = true;
    },
    closeSignInUp: (state) => {
      state.isModelOpen = false;
    },
    toggleSignInUp: (state) => {
      state.isModelOpen = !state.isModelOpen;
    },
  },
});
export const { openSignInUp, closeSignInUp, toggleSignInUp } =
  modelSignInUpSlice.actions;
export default modelSignInUpSlice.reducer;
console.log(modelSignInUpSlice);
