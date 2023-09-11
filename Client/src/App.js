import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  if (!user.token) {
    return <Login />;
  }

  // if (user.user.role !== "admin") {
  //   dispatch(getCourses(user.user.uid)).catch((error) => {
  //     console.log(error);
  //   });
  // } else {
  //   dispatch(getAllCourses()).catch((error) => {
  //     console.log(error);
  //   });
  // }

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
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
