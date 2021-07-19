import React from "react";
import LandingPage from "../src/layout/LandingPage";
import LoginPage from "./layout/LoginPage";
import NavBar from "./components/Navbar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import RegisterPage from "./layout/RegisterPage";
import SelectedPage from "./layout/SelectedPage";
import FavoritePage from "./layout/favoritePage";
import Detail from "./layout/favoritePage/detail";
import auth from "./hoc/auth";

function App() {
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
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
