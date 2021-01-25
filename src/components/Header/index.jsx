import React, { useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Menu, Select } from "antd";

import logo from "../../asset/Images/logo.png";
import Drawers from "../layout/home/Drawer";
import UserLogin from "../layout/home/UserLogin";
import { HashLink as Link } from "react-router-hash-link";
const Header = () => {
  const { Option } = Select;
  const [current, setCurrent] = useState("showtime");

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  // const Default = ({ children }) => {
  //   const isNotMobile = useMediaQuery({ minWidth: 768 });
  //   return isNotMobile ? children : null;
  // };

  const handleClick = useCallback((e) => {
    setCurrent(e.key);
  }, []);

  const handleChangeLocated = (value) => {};
  return (
    <>
      <div id="header" className="header">
        <span>
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </span>
        <Tablet>
          <>
            <Desktop>
              <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
              >
                <Menu.Item key="showtime">
                  <Link to="/home#filmBlock">Lịch Chiếu </Link>
                </Menu.Item>
                <Menu.Item key="cinema">
                  <Link to="/home#cinemaBlock">Cụm rạp </Link>
                </Menu.Item>
                <Menu.Item key="admin">
                  <Link to="/admin"> Admin </Link>
                </Menu.Item>
              </Menu>
            </Desktop>

            <div className="header_right">
              <UserLogin />

              <div className="header_right_selectedMenu">
                <Select
                  defaultValue="Hồ Chí Minh"
                  style={{ width: 150 }}
                  onChange={handleChangeLocated}
                >
                  <Option value="HoChiMinh">Hồ Chí Minh</Option>
                  <Option value="HaNoi">Hà Nộ</Option>
                  <Option value="DongNai">Đồng Nai</Option>
                  <Option value="VungTau">Vũng Tàu</Option>
                </Select>
              </div>
            </div>
          </>
        </Tablet>
        <Mobile>
          <Drawers />
        </Mobile>
      </div>
    </>
  );
};
export default Header;
