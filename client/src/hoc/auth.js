import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../components/fetcher";

export default function auth(SpecificComponent, option) {
  function AuthenticationCheck({ history }) {
    const { data } = useSWR("/api/users/user", fetcher);
    useEffect(() => {
      if (data && data.isAuth === false) {
        if (option === true) {
          history.push("/login");
        }
      }
      if (data && data._id) {
        if (option === false) {
          history.push("/");
        }
      }
    });
    if (data === undefined) {
      return (
        <div
          style={{
            width: "100%",
            height: "100vh",
            fontSize: "36px",
          }}
        >
          Loading...
        </div>
      );
    }
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
