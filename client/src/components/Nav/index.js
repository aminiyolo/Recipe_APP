import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, LeftMenu } from "./style";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";
import axios from "axios";
import { RightMenuContainer, Wrapper, Logout } from "./style";

const Nav = () => {
  const { data, revalidate } = useSWR("/api/users/user", fetcher);

  const history = useHistory();

  const logoutHandler = useCallback(() => {
    const logout = async () => {
      try {
        const res = await axios.get("/api/users/logout");
        if (res.status === 200) {
          revalidate();
          document.cookie = "USER=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"; // 쿠키 초기화
          history.push("/login");
        }
      } catch (err) {
        alert("Log Out Failed");
      }
    };

    logout();
  }, [history, revalidate]);

  return (
    <>
      {data?.token ? (
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
