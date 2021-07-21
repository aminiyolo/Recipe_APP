import React from "react";
import LandingPage from "../src/layout/LandingPage";
import LoginPage from "./layout/LoginPage";
import NavBar from "./components/Navbar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import RegisterPage from "./layout/RegisterPage";
import SelectedPage from "./layout/SelectedPage";
import FavoritePage from "./layout/favoritePage";
import Detail from "./layout/favoritePage/detail";
import ChatPage from "./layout/ChatPage";
import auth from "./hoc/auth";
import fetcher from "./components/fetcher";
import useSWR from "swr";

function App() {
  const { data } = useSWR("api/users/user", fetcher);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#FDFDFD" }}>
        <NavBar />
        <div style={{ paddingTop: "16px", background: "#FFF" }}>
          <Switch>
            <Route exact path="/" component={auth(LandingPage, null)} />
            <Route path="/login" component={auth(LoginPage, false)} />
            <Route path="/register" component={auth(RegisterPage, false)} />
            <Route
              path="/category/:category"
              component={auth(SelectedPage, null)}
            />
            <Route
              exact
              path="/favorite"
              component={auth(FavoritePage, true)}
            />
            <Route path="/favorite/:id" component={auth(Detail, null)} />
            <Route path="/chat" render={() => <ChatPage Data={data} />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
