/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";

function RightMenu({ mode }) {
  // const logoutHandler = () => {
  //   axios.get(`${USER_SERVER}/logout`).then((response) => {
  //     if (response.status === 200) {
  //       document.cookie = "x_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //       props.history.push("/login");
  //     } else {
  //       alert("Log Out Failed");
  //     }
  //   });
  // };

  return (
    <Menu mode={mode}>
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;
