import { modelSignInUpSlice } from "@/features/modalSignInUp/modalSignInUpSlice";
import { authApi } from "@/services/Auth/authApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    modalSignInUp: modelSignInUpSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authApi.middleware,
  ],
});
