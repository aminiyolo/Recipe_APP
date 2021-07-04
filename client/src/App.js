import React from "react";
import LandingPage from "../src/layout/LandingPage";
import LoginPage from "./layout/LoginPage";
import NavBar from "./components/Navbar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import RegisterPage from "./layout/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#FDFDFD" }}>
        <NavBar />
        <div style={{ paddingTop: "30px" }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
