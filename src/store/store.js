import { modelSignInUpSlice } from "@/features/modalSignInUp/modalSignInUpSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    modalSignInUp: modelSignInUpSlice.reducer,
  },
});
