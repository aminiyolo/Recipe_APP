import { Link, useHistory } from "react-router-dom";
import { Navbar, LeftMenu } from "./style";
import { RightMenuContainer, Wrapper, Logout } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/apiCalls";

const Nav = () => {
  const { currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const value = window.confirm("Are you sure you want to log out ?");
    value && logout(dispatch, currentUser.token);
  };

  return (
    <>
      {currentUser ? (
        <Navbar>
          <LeftMenu>
            <h2>
              <Link to="/">Find Recipe</Link>
            </h2>
            <p className="favorite">
              <Link to="/favorite">Favorites</Link>
            </p>
            <p className="chat">
              <Link to="/chat">Guest Book</Link>
            </p>
          </LeftMenu>
          <RightMenuContainer>
            <Logout onClick={logoutHandler}>Logout</Logout>
          </RightMenuContainer>
        </Navbar>
      ) : (
        <Navbar>
          <LeftMenu>
            <h2>
              <Link to="/">Find Recipe</Link>
            </h2>
            <p className="favorite">
              <Link to="/favorite">Favorites</Link>
            </p>
            <p className="chat">
              <Link to="/chat">Guest Book</Link>
            </p>
          </LeftMenu>
          <RightMenuContainer>
            <Wrapper>
              <div className="login">
                <Link to="/login">Login</Link>
              </div>
            </Wrapper>
          </RightMenuContainer>
        </Navbar>
      )}
    </>
  );
};

export default Nav;
