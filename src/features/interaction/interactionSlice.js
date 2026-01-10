import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePostId: null, //id post
  activeType: null, // repeat or send
};

export const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    toggleInteraction: (state, action) => {
      const { postId, type } = action.payload;
      if (state.activePostId === postId && state.activeType === type) {
        state.activePostId = null;
        state.activeType = null;
      } else {
        state.activeType = type;
        state.activePostId = postId;
      }
    },
    closeInteraction: (state) => {
      state.activePostId = null;
      state.activeType = null;
    },
  },
});

export const { toggleInteraction, closeInteraction } = interactionSlice.actions;
export default interactionSlice.reducer;
