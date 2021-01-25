import React, { useCallback, useState } from "react";
import { Button, Drawer, Menu } from "antd";
import UserLogin from "./UserLogin";
import { AlignRightOutlined, RightOutlined } from "@ant-design/icons";
import { HashLink as Link } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOG_OUT } from "../../../util/setting/config";
const Drawers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("showtime");

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleClick = useCallback((e) => {
    setCurrent(e.key);
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
  return (
    <div className="Drawer">
      <Button className="Drawer__btnShow" onClick={showDrawer}>
        <AlignRightOutlined style={{ fontSize: "30px" }} />
      </Button>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="Drawer__top">
          <>
            <UserLogin visible={visible} />
          </>
          <Button
            className="Drawer__top__btnHide"
            onClick={onClose}
            style={{ border: "none" }}
          >
            <RightOutlined />{" "}
          </Button>
        </div>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
          <Menu.Item key="showtime">
            <Link to="/home#filmBlock">Lịch Chiếu </Link>
          </Menu.Item>
          <Menu.Item onClick={onClose} key="cinema">
            <Link to="/home#cinemaBlock">Cụm rạp </Link>
          </Menu.Item>
          <Menu.Item onClick={onClose} key="news">
            Tin tức
          </Menu.Item>
          <Menu.Item key="logOut" onClick={logOut}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
};
export default Drawers;
