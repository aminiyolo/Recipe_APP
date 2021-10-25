import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, token) => {
  try {
    await axios.get("/api/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logoutSuccess());
  } catch (err) {
    console.log(err);
  }
};
