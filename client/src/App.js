import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import fetcher from "./components/fetcher";
import useSWR from "swr";
import loadble from "@loadable/component";

const LandingPage = loadble(() => import("../src/layout/LandingPage"));
const LoginPage = loadble(() => import("./layout/LoginPage"));
const RegisterPage = loadble(() => import("./layout/RegisterPage"));
const FavoritePage = loadble(() => import("./layout/favoritePage"));
const Detail = loadble(() => import("./layout/favoritePage/detail"));
const ChatPage = loadble(() => import("./layout/ChatPage"));
const Nav = loadble(() => import("./components/Nav"));

function App() {
  const { data } = useSWR("api/users/user", fetcher);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#FDFDFD" }}>
        <Nav />
        <div style={{ paddingTop: "16px", background: "#FFF" }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/favorite" component={FavoritePage} />
            <Route path="/favorite/:id" component={Detail} />
            <Route path="/chat" render={() => <ChatPage Data={data} />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
