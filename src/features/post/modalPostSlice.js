import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};
export const modalPostSlice = createSlice({
  name: "modalPost",
  initialState,
  reducers: {
    openModalPost: (state) => {
      state.isModalOpen = true;
    },
    closeModalPost: (state) => {
      state.isModalOpen = false;
    },
    toggleModalPost: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});
export const { openModalPost, closeModalPost, toggleModalPost } =
  modalPostSlice.actions;
export default modalPostSlice.reducer;
