import { createSlice } from "@reduxjs/toolkit";

type User = {
  token: string;
  ID: string;
  _id: string;
  image: string;
  name: string;
};

interface IState {
  currentUser: User | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: IState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    loginSet: (state) => {
      state.error = false;
    },

    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  loginSet,
} = userSlice.actions;
export default userSlice.reducer;
