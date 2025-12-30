import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isModalOpen: false,
  modalType: "default",
};
export const modelSignInUpSlice = createSlice({
  name: "modalSignInUp",
  initialState,
  reducers: {
    openSignInUp: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload || "default";
    },
    closeSignInUp: (state) => {
      state.isModalOpen = false;
      state.modalType = "default";
    },
    toggleSignInUp: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});
export const { openSignInUp, closeSignInUp, toggleSignInUp } =
  modelSignInUpSlice.actions;
export default modelSignInUpSlice.reducer;
