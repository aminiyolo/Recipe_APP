import React from "react";
import { Link } from "react-router-dom";
import { Navbar, LeftMenu } from "./style";
import RightMenu from "./RightMenu";

const Nav = () => {
  return (
    <Navbar>
      <LeftMenu>
        <h2>
          <Link to="/">Find Recipe</Link>
        </h2>
        <p className="favorite">
          <Link to="/favorite">Favorite</Link>
        </p>
        <p className="chat">
          <Link to="/chat">Guest Book</Link>
        </p>
      </LeftMenu>
      <RightMenu />
    </Navbar>
  );
};

export default Nav;
