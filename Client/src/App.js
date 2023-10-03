import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListProducts from "./pages/list/ListProducts";
import ListProfiles from "./pages/list/ListProfiles";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";
import ListServices from "./pages/list/ListServices";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector((state) => state.user);

  if (!user.token) {
    return <Login />;
  }

  window.localStorage.setItem("loggedAppUser", JSON.stringify(user));

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
            </Route>
            <Route path="products">
              <Route index element={<ListProducts />} />
              <Route path=":productId" element={<Single />} />
            </Route>
            <Route path="profiles">
              <Route index element={<ListProfiles />} />
              <Route path=":productId" element={<Single />} />
            </Route>
            <Route path="services">
              <Route index element={<ListServices />} />
              <Route path=":productId" element={<Single />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
