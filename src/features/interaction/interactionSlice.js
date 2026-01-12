import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePostId: null, //id post
  activeType: null, // repeat or send

  activePostData: {},
};

export const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    toggleInteraction: (state, action) => {
      const { postId, type, data } = action.payload;
      // đang mở thì đóng
      if (state.activePostId === postId && state.activeType === type) {
        state.activePostId = null;
        state.activeType = null;
        state.activePostData = {};
      }
      // Mở cái mới lưu dữ liệu
      else {
        state.activeType = type;
        state.activePostId = postId;
        state.activePostData = data || {};
      }
    },
    closeInteraction: (state) => {
      state.activePostId = null;
      state.activeType = null;
      state.activePostData = {};
    },
  },
});

export const { toggleInteraction, closeInteraction } = interactionSlice.actions;
export default interactionSlice.reducer;
