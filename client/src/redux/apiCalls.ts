import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";
import { axiosInstance } from "../config";
import { Dispatch } from "redux";

interface IUser {
  ID: string;
  password: string;
}

export const login = async (dispatch: Dispatch, user: IUser) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("/api/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch: Dispatch, token: string) => {
  try {
    await axiosInstance.get("/api/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logoutSuccess());
  } catch (err) {
    console.log(err);
  }
};
