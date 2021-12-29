import { Route, Switch, BrowserRouter } from "react-router-dom";
import loadble from "@loadable/component";

const LandingPage = loadble(() => import("./pages/LandingPage"));
const LoginPage = loadble(() => import("./pages/LoginPage"));
const RegisterPage = loadble(() => import("./pages/RegisterPage"));
const FavoritePage = loadble(() => import("./pages/favoritePage"));
const Detail = loadble(() => import("./pages/favoritePage/detail"));
const ChatPage = loadble(() => import("./pages/ChatPage"));
const Nav = loadble(() => import("./components/Nav"));

function App() {
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
            <Route path="/chat" component={ChatPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
