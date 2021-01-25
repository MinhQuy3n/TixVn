import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import SeatItem from "./SeatList/seatItem";
import RapDemo from "../../../asset/Images/rap-demo.jpg";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { iconURL } from "../../../asset/iconfont";
import { useMediaQuery } from "react-responsive";
import { Statistic } from "antd";

const { Countdown } = Statistic;

const LeftCheckOut = () => {
  const deadline = Date.now() + 2 * 60 * 60 * 20.9 * 2; // Moment is also OK

  const IconFont = createFromIconfontCN({
    scriptUrl: iconURL,
  });
  const PC = ({ children }) => {
    const isPC = useMediaQuery({ minWidth: 789 });
    return isPC ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 788 });

    return isMobile ? children : null;
  };
  const infoCinema = useSelector(
    (state) => state.Cinema.listTicketRoom.thongTinPhim
  );

  const seatList = useSelector(
    (state) => state.Cinema.listTicketRoom.danhSachGhe
  );

  const infoUser = JSON.parse(localStorage.getItem("userInfo"));

  const renderSeatList = useCallback(() => {
    if (seatList) {
      return seatList.map((seat, index) => {
        return <SeatItem seat={seat} index={index} key={index} />;
      });
    }
  }, [seatList]);

  return (
    <>
      {seatList ? (
        <div className="leftCheckOut">
          <div className="seatCheckOut__navTop">
            <PC>
              <div className="leftStep">
                <ul>
                  <li className="active">
                    <span className="stepNumber">01</span>
                    CHỌN GHẾ {`&`} THANH TOÁN
                  </li>
                </ul>
              </div>
            </PC>
            <Mobile>
              <div className="icon__close">
                <CloseOutlined />
              </div>
              <span className="seatCheckOut__navTop__title">
                CHỌN GHẾ {`&`} THANH TOÁN
              </span>
            </Mobile>
            <div className="navTop__user">
              <Avatar size={32} icon={<UserOutlined />} />
              <span className="navTop__user__name">{infoUser.hoTen}</span>
            </div>
          </div>
          <div className="seatCheckOut">
            <div className="topContent">
              <div className="leftTitle">
                <div className="logoCinema">
                  <img src={RapDemo} alt="imgRap" />
                </div>
                <div className="contentcinema">
                  <p className="address">
                    {infoCinema ? infoCinema.tenCumRap : <></>}
                  </p>
                  <p className="hour">
                    Ngày mai - {infoCinema ? infoCinema.gioChieu : <></>} -
                    {infoCinema ? infoCinema.tenRap : <></>}
                  </p>
                </div>
              </div>
              <div className="rightTitle">
                <Countdown
                  className="info2"
                  title="thời gian giữ ghế"
                  value={deadline}
                  format="mm:ss"
                />
              </div>
            </div>

            <div className="seatList__screen">Screen</div>
            <div className="seatList">{renderSeatList()}</div>
          </div>
          <div className="typeSeat">
            <div className="typeSeat__item">
              <IconFont
                className="icon"
                style={{ cursor: "pointer" }}
                type="icon-seat-Thuong"
              />
              <span> Ghế thường </span>
            </div>
            <div className="typeSeat__item">
              <IconFont
                className="icon"
                style={{ cursor: "pointer" }}
                type="icon-seat-Vip"
              />
              <span> Ghế VIP </span>
            </div>
            <div className="typeSeat__item">
              <IconFont
                className="icon"
                style={{ cursor: "pointer" }}
                type="icon-seat-booked"
              />
              <span> Ghế đã cò người chọn </span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(LeftCheckOut);
