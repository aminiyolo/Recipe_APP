import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import fetcher from "./components/fetcher";
import useSWR from "swr";
import auth from "./hoc/auth";
import loadble from "@loadable/component";

const LandingPage = loadble(() => import("../src/layout/LandingPage"));
const LoginPage = loadble(() => import("./layout/LoginPage"));
const NavBar = loadble(() => import("./components/Navbar"));
const RegisterPage = loadble(() => import("./layout/RegisterPage"));
const SelectedPage = loadble(() => import("./layout/SelectedPage"));
const FavoritePage = loadble(() => import("./layout/favoritePage"));
const Detail = loadble(() => import("./layout/favoritePage/detail"));
const ChatPage = loadble(() => import("./layout/ChatPage"));

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
