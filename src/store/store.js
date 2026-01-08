import { modelSignInUpSlice } from "@/features/modalSignInUp/modalSignInUpSlice";
import { authApi } from "@/services/Auth/authApi";
import { postInteractions } from "@/services/Interactions/postInteractions";
import { postApi } from "@/services/Post/authApi";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    modalSignInUp: modelSignInUpSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [postInteractions.reducerPath]: postInteractions.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authApi.middleware,
    postApi.middleware,
    postInteractions.middleware,
  ],
});
