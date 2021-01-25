import React, { useCallback, useEffect, useState } from "react";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import UserManagement from "../../components/layout/Admin/userManagement";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../redux/action/userAction";
import FilmManagement from "../../components/layout/Admin/filmManagement";
import { getListFilm } from "../../redux/action/filmAction";
import SignInAdmin from "./signin";
import { ADMIN_SET_TOKEN } from "../../util/setting/config";
import { useHistory } from "react-router-dom";

const openNavLeft = () => {
  const sideNavLeft = document.getElementById("sideNavLeft");
  sideNavLeft.style.width = "250px";
  const content = document.getElementById("AdminPage__content");
  content.style.marginLeft = "250px";
  const btnOpen = document.getElementById("btnOpen");
  btnOpen.style.marginLeft = "-250px";
};
const closeNavLeft = () => {
  const sideNavLeft = document.getElementById("sideNavLeft");
  sideNavLeft.style.width = "0";
  const content = document.getElementById("AdminPage__content");
  content.style.marginLeft = "0";
  const btnOpen = document.getElementById("btnOpen");
  btnOpen.style.marginLeft = "0";
};
const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    getUserList(dispatch);
    getListFilm(dispatch);
  }, [dispatch]);
  const [active, setActive] = useState("user");
  const handleActive = useCallback((name) => {
    setActive(name);
  }, []);
  const adminInfo = useSelector((state) => state.Auth.adminToken);
  const logOut = useCallback(() => {
    localStorage.removeItem("adminInfo");
    dispatch({
      type: ADMIN_SET_TOKEN,
      payload: "",
    });
    history.push("/signinadmin");
  }, [dispatch, history]);
  return (
    <>
      {adminInfo ? (
        <div className="AdminPage" id="AdminPage">
          <div className="AdminPage__navtop grid grid-cols-6 gap-4">
            <span
              id="btnOpen"
              className="col-start-1 col-end-3 text-white font-bold ml-2"
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={openNavLeft}
            >
              ☰
            </span>
            <span className="col-end-7 col-span-2 flex-none text-white font-bold	 flex justify-end  py-3 px-6">
              <span className="flex align-center">
                {" "}
                <UserOutlined style={{ lineHeight: "21px" }} />{" "}
              </span>
              <span className="ml-2">{adminInfo.hoTen}</span>
            </span>
          </div>
          <div id="sideNavLeft" className="sideNavLeft">
            <CloseOutlined className="closeBtn" onClick={closeNavLeft} />

            <span
              onClick={() => {
                handleActive("user");
              }}
            >
              Users
            </span>

            <span
              onClick={() => {
                handleActive("film");
              }}
            >
              Film
            </span>

            <div className="AdminPage__console">
              <span
                onClick={() => {
                  history.push("/");
                }}
              >
                HomePage
              </span>
              <span onClick={logOut}>LogOut</span>
            </div>
          </div>
          <div className="AdminPage__content" id="AdminPage__content">
            <div
              className={`AdminPage__content__item ${
                active === "user" ? "AdminPage__content__active" : ""
              }`}
              id="user"
            >
              <UserManagement />
            </div>

            <div
              className={`AdminPage__content__item ${
                active === "film" ? "AdminPage__content__active" : ""
              }`}
              id="AdminPage__content film"
            >
              <FilmManagement />
            </div>
          </div>
        </div>
      ) : (
        <>
          <SignInAdmin />
        </>
      )}
    </>
  );
};
export default Admin;
