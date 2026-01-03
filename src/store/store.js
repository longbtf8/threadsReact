import reducer, {
  modelSignInUpSlice,
} from "@/features/modalSignInUp/modalSignInUpSlice";
import { loginApi } from "@/services/Auth/loginApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    modalSignInUp: modelSignInUpSlice.reducer,
    [loginApi.reducerPath]: reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    loginApi.middleware,
  ],
});
