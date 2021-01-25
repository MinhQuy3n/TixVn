import React, { Suspense, useEffect } from "react";
import "./App.css";
import "./App.scss";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { ADMIN_SET_TOKEN, SET_TOKEN } from "./util/setting/config";
import { useDispatch } from "react-redux";
import { UpOutlined } from "@ant-design/icons";
import Signin from "./pages/Signin";
// import Home from "./pages/Home";
// import CheckOut from "./pages/CheckOut";
import Admin from "./pages/admin";
import SignInAdmin from "./pages/admin/signin";
import logo from "./asset/Images/web-logo.png";
import wrapper from "./HOCs/wrapper";
import { BackTop } from "antd";

const Information = React.lazy(() => import("./pages/Information"));
const Home = React.lazy(() => import("./pages/Home"));
const Detail = React.lazy(() => import("./pages/Detail"));
const CheckOut = React.lazy(() => import("./pages/CheckOut"));

// const Login = React.lazy(() => import("./pages/Login"));
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#fb4226",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      dispatch({
        type: SET_TOKEN,
        payload: JSON.parse(localStorage.getItem("userInfo")),
      });
    }
  });
  useEffect(() => {
    if (localStorage.getItem("adminInfo")) {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      dispatch({
        type: ADMIN_SET_TOKEN,
        payload: adminInfo,
      });
    }
  }, [dispatch]);
  const renderLoader = () => (
    <div className="loader">
      <img src={logo} alt="logo" />
    </div>
  );

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={renderLoader()}>
            <Switch>
              <Route path="/signinadmin" component={SignInAdmin} />
              <Route path="/admin" component={Admin} />
              <Route path="/information" component={wrapper(Information)} />
              <Route path="/checkout/:id" component={CheckOut} />
              <Route path="/detail/:id" component={wrapper(Detail)} />
              <Route path="/signin" component={Signin} />
              <Route path="/home" component={wrapper(Home)} />
              <Route path="/" component={wrapper(Home)} />
            </Switch>
          </Suspense>
        </BrowserRouter>
        <BackTop style={style}>
          <UpOutlined style={{ fontSize: 20 }} />
        </BackTop>
      </div>
    </>
  );
}

export default App;
