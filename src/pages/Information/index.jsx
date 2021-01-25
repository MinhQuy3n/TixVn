import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InformationAccount from "../../components/layout/Information/account";
import ChangePass from "../../components/layout/Information/changePass";

import { Tabs } from "antd";

import backGround from "../../asset/Images/backgroundSignIn.jpg";
import HistoryBooked from "../../components/layout/Information/historyBooked";

import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/action/userAction";
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;

const Information = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const infoUser = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserInfo(dispatch, infoUser.taiKhoan);
  }, [dispatch, infoUser.taiKhoan]);
  const [defaultKey, setDefaultKey] = useState("1");

  return (
    <>
      <div
        className="Information"
        style={{
          background: `url(${backGround})`,
        }}
      >
        <Header />

        <div className="Information__container">
          <Tabs
            className="Information__content"
            defaultActiveKey={location.state ? "3" : defaultKey}
            tabPosition="left"
          >
            <TabPane tab="Thông Tin" key="1">
              <InformationAccount />
            </TabPane>
            <TabPane tab="Đổi Mật Khẩu" key="2">
              <ChangePass />
            </TabPane>
            <TabPane tab="Lịch Sử Đăt Vé" key="3">
              <HistoryBooked />
            </TabPane>
          </Tabs>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Information;
