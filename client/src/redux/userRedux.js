// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: null,
//     isFetching: false,
//     error: false,
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.isFetching = true;
//     },

//     loginSuccess: (state, action) => {
//       state.isFetching = false;
//       state.user = action.payload;
//       state.error = false;
//     },

//     loginFailure: (state) => {
//       state.isFetching = false;
//       state.error = true;
//     },

//     loginSet: (state) => {
//       state.error = false;
//     },

//     logoutSuccess: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logoutSuccess,
//   loginSet,
// } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
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
