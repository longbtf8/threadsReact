import { interactionSlice } from "@/features/interaction/interactionSlice";
import { modelSignInUpSlice } from "@/features/modalSignInUp/modalSignInUpSlice";
import { authApi } from "@/services/Auth/authApi";
import { postInteractions } from "@/services/Interactions/postInteractions";
import { postApi } from "@/services/postService.js";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    modalSignInUp: modelSignInUpSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [postInteractions.reducerPath]: postInteractions.reducer,
    interaction: interactionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authApi.middleware,
    postApi.middleware,
    postInteractions.middleware,
  ],
});
