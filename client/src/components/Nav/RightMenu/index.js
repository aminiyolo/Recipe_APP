import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../fetcher";
import { RightMenuContainer, Wrapper, Logout } from "./style";

const RightMenu = () => {
  const history = useHistory();
  const { data, revalidate } = useSWR("/api/users/user", fetcher);

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

  if (data === undefined) {
    <div>Loading...</div>;
  }

  setTimeout(() => {
    revalidate();
  }, 500);

  return (
    <RightMenuContainer>
      {!data?.token ? (
        <Wrapper>
          <div className="login">
            <Link to="/login">Login</Link>
          </div>
        </Wrapper>
      ) : (
        <Logout onClick={logoutHandler}>Logout</Logout>
      )}
    </RightMenuContainer>
  );
};

export default RightMenu;
