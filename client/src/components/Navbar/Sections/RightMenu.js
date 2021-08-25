import React, { useCallback } from "react";
import { Menu } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../fetcher";
import { withRouter } from "react-router";

function RightMenu({ mode, history }) {
  const { data, revalidate } = useSWR("/api/users/user", fetcher);

  const logoutHandler = useCallback(() => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        revalidate();
        document.cookie = "USER=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"; // 쿠키 초기화
        history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  }, [history]);

  if (data === undefined) {
    <div>Loading...</div>;
  }

  setTimeout(() => {
    revalidate();
  }, 500);

  if (document.cookie) {
    return (
      <Menu mode={mode}>
        <Menu.Item className="logout" key="logout">
          <span onClick={logoutHandler}>Logout</span>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
