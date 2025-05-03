import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  username: string;
}

const initialState: LoginState = {
  username:
    typeof window !== "undefined" ? localStorage.getItem("username") || "" : "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state: LoginState, action: { payload: string }) => {
      state.username = action.payload;
    },
    logout: (state: LoginState) => {
      state.username = "";
    },
  },
});

export const { setUsername, logout } = loginSlice.actions;
export default loginSlice.reducer;
