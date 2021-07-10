import React from "react";
import LandingPage from "../src/layout/LandingPage";
import LoginPage from "./layout/LoginPage";
import NavBar from "./components/Navbar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import RegisterPage from "./layout/RegisterPage";
import SelectedPage from "./layout/SelectedPage";
import FavoritePage from "./layout/favoritePage";
import Detail from "./layout/favoritePage/detail";

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#FDFDFD" }}>
        <NavBar />
        <div style={{ paddingTop: "16px", background: "#FFF" }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/category/:category" component={SelectedPage} />
            <Route exact path="/favorite" component={FavoritePage} />
            <Route path="/favorite/:id" component={Detail} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
