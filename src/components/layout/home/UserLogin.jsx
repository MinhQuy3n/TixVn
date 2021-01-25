import { React, useCallback, useState } from "react";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Menu, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { LOG_OUT } from "../../../util/setting/config";
import { NavLink, useHistory, withRouter } from "react-router-dom";

const UserLogin = ({ drawer, ...props }) => {
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const PC = ({ children }) => {
    const isPC = useMediaQuery({ minWidth: 768 });
    return isPC ? children : null;
  };
  const [visible, setVisible] = useState();
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setVisible(false);
    }
  };

  const handleVisibleChange = useCallback((flag) => {
    setVisible(flag);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("userInfo");
    history.replace("/");
    window.location.reload();
    dispatch({
      type: LOG_OUT,
      payload: "",
    });
  }, [dispatch, history]);

  const menu = (
    <Menu className="header__login__dropDown" onClick={handleMenuClick}>
      <Menu.Item key="1">
        <NavLink to="/information" exact>
          Thông tin
        </NavLink>
      </Menu.Item>

      <Menu.Item key="2" onClick={logOut}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <span className="header__login">
        <Avatar icon={<UserOutlined />} />
        {/* {visible === true ?():()} */}
        {localStorage.getItem("userInfo") ? (
          <>
            <Mobile>
              <span> {userInfo.hoTen} </span>
            </Mobile>
            <PC>
              <Dropdown
                overlay={menu}
                onVisibleChange={handleVisibleChange}
                visible={visible}
                placement="bottomCenter"
                arrow
              >
                <span className="ant-dropdown-link">
                  {userInfo.hoTen} <DownOutlined />
                </span>
              </Dropdown>
            </PC>
          </>
        ) : (
          <NavLink to="/signin" exact>
            <span>Đăng Nhập</span>
          </NavLink>
        )}
      </span>
    </>
  );
};
export default withRouter(UserLogin);
