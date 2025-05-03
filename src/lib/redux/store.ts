import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";

export interface RootState {
  login: ReturnType<typeof loginReducer>;
}

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
