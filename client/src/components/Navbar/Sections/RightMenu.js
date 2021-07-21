import React from "react";
import { Menu } from "antd";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../fetcher";
import { withRouter } from "react-router";

function RightMenu({ mode, history }) {
  const { data, err, revalidate } = useSWR("/api/users/user", fetcher);

  const logoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        revalidate();
        document.cookie = "USER=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (data === undefined) {
    <div>Loading...</div>;
  }

  setTimeout(() => {
    revalidate();
  }, 500);

  if (document.cookie) {
    return (
      <Menu mode={mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
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
}

export default withRouter(RightMenu);
