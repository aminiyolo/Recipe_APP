import React from "react";
import { Menu } from "antd";

function LeftMenu({ mode }) {
  return (
    <Menu mode={mode}>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
