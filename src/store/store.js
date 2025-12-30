import { modelSignInUpSlice } from "@/features/ui/modelSignInUpSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    modelSignInUp: modelSignInUpSlice.reducer,
  },
});
