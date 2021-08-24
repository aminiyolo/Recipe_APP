import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function LeftMenu({ mode }) {
  return (
    <Menu mode={mode}>
      <Menu.Item key="favorite">
        <Link to="/favorite">Favorite</Link>
      </Menu.Item>
      <Menu.Item key="chat">
        <Link to="/chat">Chat</Link>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
