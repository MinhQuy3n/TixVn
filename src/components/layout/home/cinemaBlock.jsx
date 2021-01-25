import React, { memo, useCallback, useEffect } from "react";
import { Collapse, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoCinema,
  getListTicketRoom,
} from "../../../redux/action/cinemaAction";
import { useMediaQuery } from "react-responsive";
import rapDemo from "../../../asset/Images/rap-demo.jpg";
import Swal from "sweetalert2";
import ImgNofi from "../../../asset/Images/Post-notification.png";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const CinemaBlock = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getInfoCinema(dispatch, "BHDStar");
  }, [dispatch]);
  const userInfo = useSelector((state) => state.Auth.token);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 579 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 578 });
    return isMobile ? children : null;
  };

  const cinemaList = useSelector((state) => state.Cinema.cinemaList);

  const infoCinema = useSelector((state) => state.Cinema.infoCinema[0]);

  const handleChange = useCallback(
    (key) => {
      console.log(key);
      getInfoCinema(dispatch, key);
    },
    [dispatch]
  );
  const goToBookingTicket = (idShowTime) => {
    if (userInfo) {
      history.push(`/checkout/` + idShowTime);
      getListTicketRoom(dispatch, idShowTime);
    } else {
      let timerInterval;
      Swal.fire({
        html: "Xin hãy đăng nhập!",
        timer: 90000,
        timerProgressBar: false,
        imageWidth: 100,
        imageHeight: 70,
        imageAlt: "Custom image",
        imageUrl: ImgNofi,

        didOpen: () => {
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector("b");
              if (b) {
                b.textContent = Swal.getTimerLeft();
              }
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });
    }
  };

  const renderCinemaList = useCallback(() => {
    if (cinemaList) {
      return cinemaList.map((cinema, index) => {
        return (
          <TabPane
            key={cinema.maHeThongRap}
            tab={
              <span
                onClick={() => {
                  getInfoCinema(dispatch, cinema.maHeThongRap);
                }}
              >
                <img style={{ width: 50 }} src={cinema.logo} alt={index + 1} />
              </span>
            }
          >
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              style={{ height: 600 }}
            >
              {renderInfoCinema()}
            </Tabs>
          </TabPane>
        );
      });
    }
  }, [cinemaList, infoCinema]);

  const renderInfoCinema = useCallback(() => {
    if (infoCinema) {
      return infoCinema.lstCumRap.map((info, index) => {
        let nameCinema = "";

        let lastNameCinema = "";
        const maHeThongRap = infoCinema.maHeThongRap;

        const fullNameCinema = (info) => {
          if (maHeThongRap === "LotteCinima") {
            nameCinema = info.tenCumRap.split("", 5);

            lastNameCinema = info.tenCumRap.substring(6, 30);
            return;
          }
          if (maHeThongRap === "MegaGS") {
            nameCinema = info.tenCumRap.split("", 6);

            lastNameCinema = info.tenCumRap.substring(7, 40);
            return;
          }
          if (maHeThongRap === "BHDStar") {
            nameCinema = info.tenCumRap.split("", 8);
            lastNameCinema = info.tenCumRap.substring(8, 40);
            return;
          } else {
            lastNameCinema = info.tenCumRap.substring(3, 40);
            nameCinema = info.tenCumRap.split(" ", 1);
          }
        };
        fullNameCinema(info);

        return (
          <TabPane
            key={index + 1}
            tab={
              <>
                <div className="cinemaBlock__Img">
                  <img src={rapDemo} alt="rapDemo" />
                </div>
                <div className="cinemaBlock__info">
                  <p>
                    <span className={`color${maHeThongRap}`}>{nameCinema}</span>
                    {lastNameCinema}
                  </p>
                  <p className="cinemaBlock__address"> {info.diaChi} </p>
                </div>
              </>
            }
          >
            <Desktop>
              <Collapse accordion defaultActiveKey={["1"]}>
                {info.danhSachPhim.slice(0, 3).map((listFilm, index) => {
                  return (
                    <Panel
                      key={index}
                      header={
                        <div className="cinemaBlock__listFilm">
                          <div className="cinemaBlock__listFilm_img">
                            <img src={listFilm.hinhAnh} alt="imgFilm" />
                          </div>
                          <div className="cinemaBlock__listFilm_info">
                            <div>
                              <span className="tagFilm">MQ</span>
                              <span className="cinemaBlock__listFilm_name">
                                {listFilm.tenPhim}
                              </span>
                            </div>
                            <p className="time"> 105 phút - TIX 8.4 - IMDb 0</p>
                          </div>
                        </div>
                      }
                    >
                      {listFilm.lstLichChieuTheoPhim
                        .slice(0, 4)
                        .map((showTime, index) => {
                          let hour = "";
                          let minute = "";
                          const getTime = (showTime) => {
                            hour = new Date(
                              showTime.ngayChieuGioChieu
                            ).getHours();
                            minute = new Date(
                              showTime.ngayChieuGioChieu
                            ).getMinutes();
                          };
                          getTime(showTime);

                          return (
                            <button
                              className="cinemaBlock__listFilm_session"
                              key={index}
                              onClick={() => {
                                goToBookingTicket(showTime.maLichChieu);
                              }}
                            >
                              <span className="timeStart">
                                {hour} : {minute}
                              </span>
                              <span className="timeEnd">
                                ~ {hour + 2} : {minute}
                              </span>
                            </button>
                          );
                        })}
                    </Panel>
                  );
                })}
              </Collapse>
            </Desktop>
          </TabPane>
        );
      });
    }
  }, [infoCinema]);

  const renderCinemaListMobile = useCallback(() => {
    if (cinemaList) {
      return cinemaList.map((cinema, index) => {
        return (
          <Panel
            header={
              <span className="flex flex-row items-center">
                <img
                  style={{ width: 50 }}
                  src={cinema.logo}
                  alt={index + 1}
                  className="mr-2"
                />
                {cinema.tenHeThongRap}
              </span>
            }
            key={cinema.maHeThongRap}
          >
            {/* <Collapse accordion>{renderInfoCinemaMobile()}</Collapse> */}
          </Panel>
        );
      });
    }
  }, [cinemaList, dispatch]);
  const renderInfoCinemaMobile = useCallback(() => {
    if (infoCinema) {
      return infoCinema.lstCumRap.map((info, index) => {
        let nameCinema = "";

        let lastNameCinema = "";
        const maHeThongRap = infoCinema.maHeThongRap;

        const fullNameCinema = (info) => {
          if (maHeThongRap === "LotteCinima") {
            nameCinema = info.tenCumRap.split("", 5);

            lastNameCinema = info.tenCumRap.substring(6, 30);
            return;
          }
          if (maHeThongRap === "MegaGS") {
            nameCinema = info.tenCumRap.split("", 6);

            lastNameCinema = info.tenCumRap.substring(7, 40);
            return;
          }
          if (maHeThongRap === "BHDStar") {
            nameCinema = info.tenCumRap.split("", 8);
            lastNameCinema = info.tenCumRap.substring(8, 40);
            return;
          } else {
            lastNameCinema = info.tenCumRap.substring(3, 40);
            nameCinema = info.tenCumRap.split(" ", 1);
          }
        };
        fullNameCinema(info);

        return (
          <>
            <Panel
              header={
                <>
                  <div className="cinemaBlock__Img">
                    <img src={rapDemo} alt="rapDemo" />
                  </div>
                  <div className="cinemaBlock__info">
                    <p>
                      <span className={`color${maHeThongRap}`}>
                        {nameCinema}
                      </span>
                      {lastNameCinema}
                    </p>
                    <p className="cinemaBlock__address"> {info.diaChi} </p>
                  </div>
                </>
              }
              key={index}
            >
              <Collapse accordion defaultActiveKey={["1"]}>
                {info.danhSachPhim.slice(0, 3).map((listFilm, index) => {
                  return (
                    <Panel
                      header={
                        <div className="cinemaBlock__listFilm">
                          <div className="cinemaBlock__listFilm_img">
                            <img src={listFilm.hinhAnh} alt="imgFilm" />
                          </div>
                          <div className="cinemaBlock__listFilm_info">
                            <div>
                              <span className="tagFilm">MQ</span>
                              <span className="cinemaBlock__listFilm_name">
                                {listFilm.tenPhim}
                              </span>
                            </div>
                            <p className="time"> 105 phút - TIX 8.4 - IMDb 0</p>
                          </div>
                        </div>
                      }
                      key={index}
                    >
                      {listFilm.lstLichChieuTheoPhim
                        .slice(0, 4)
                        .map((showTime, index) => {
                          let hour = "";
                          let minute = "";
                          const getTime = (showTime) => {
                            hour = new Date(
                              showTime.ngayChieuGioChieu
                            ).getHours();
                            minute = new Date(
                              showTime.ngayChieuGioChieu
                            ).getMinutes();
                          };
                          getTime(showTime);

                          return (
                            <button
                              className="cinemaBlock__listFilm_session"
                              key={index}
                              onClick={() => {
                                goToBookingTicket(showTime.maLichChieu);
                              }}
                            >
                              <span className="timeStart">
                                {hour} : {minute}
                              </span>
                              <span className="timeEnd">
                                ~ {hour + 2} : {minute}
                              </span>
                            </button>
                          );
                        })}
                    </Panel>
                  );
                })}
              </Collapse>
            </Panel>
          </>
        );
      });
    }
  }, []);
  return (
    <>
      <div>
        <Desktop>
          <Tabs id="cinemaBlock" defaultActiveKey="BHDStar" centered>
            {renderCinemaList()}
          </Tabs>
        </Desktop>
        <Mobile>
          <Collapse
            // onChange={handleChange}

            bordered
            accordion={false}
          >
            {renderCinemaListMobile()}
          </Collapse>
        </Mobile>
      </div>
    </>
  );
};
export default memo(CinemaBlock);
