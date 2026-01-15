import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  variant: "default",
};
export const modalPostSlice = createSlice({
  name: "modalPost",
  initialState,
  reducers: {
    openModalPost: (state, action) => {
      state.isModalOpen = true;
      state.variant = action.payload || "default";
    },
    closeModalPost: (state) => {
      state.isModalOpen = false;
      state.variant = "default";
    },
    toggleModalPost: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});
export const { openModalPost, closeModalPost, toggleModalPost } =
  modalPostSlice.actions;
export default modalPostSlice.reducer;
