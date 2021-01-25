import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Tabs } from "antd";
import rapDemo from "../../../../asset/Images/rap-demo.jpg";
import { useMediaQuery } from "react-responsive";
import { getListTicketRoom } from "../../../../redux/action/cinemaAction";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import ImgNofi from "../../../../asset/Images/Post-notification.png";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const ShowTimes = () => {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 579 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 578 });
    return isMobile ? children : null;
  };
  const showTimes = useSelector((state) => state.Film.showTimes);
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.Auth.token);

  const goToBookingTicket = useCallback(
    (idShowTime) => {
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
    },
    [history, userInfo, dispatch]
  );

  const renderCinemaList = useCallback(() => {
    if (showTimes.heThongRapChieu) {
      return showTimes.heThongRapChieu.map((cinema, index) => {
        return (
          <TabPane
            key={index + 1}
            tab={
              <span>
                <img style={{ width: 70 }} src={cinema.logo} alt={index + 1} />
              </span>
            }
          >
            <Desktop>
              <Tabs
                defaultActiveKey="0"
                tabPosition="left"
                style={{ height: 300 }}
              >
                {renderInfoCinema(index, cinema.maHeThongRap)}
              </Tabs>
            </Desktop>
            <Mobile>
              <Collapse accordion>
                {renderInfoCinemaMobile(index, cinema.maHeThongRap)}
              </Collapse>
            </Mobile>
          </TabPane>
        );
      });
    }
  }, [showTimes]);
  const renderInfoCinema = (index, idCinema, nameCinema) => {
    if (showTimes.heThongRapChieu[index].cumRapChieu) {
      return showTimes.heThongRapChieu[index].cumRapChieu.map(
        (showTimes, index) => {
          let nameCinemas = "";

          let lastNameCinema = "";
          const maHeThongRap = idCinema;

          const fullNameCinema = (nameCinema) => {
            if (maHeThongRap === "LotteCinima") {
              nameCinemas = nameCinema.split("", 5);

              lastNameCinema = nameCinema.substring(5, 30);
              return;
            }
            if (maHeThongRap === "MegaGS") {
              nameCinemas = nameCinema.split("", 6);

              lastNameCinema = nameCinema.substring(7, 40);
              return;
            }
            if (maHeThongRap === "BHDStar") {
              nameCinemas = nameCinema.split("", 8);
              lastNameCinema = nameCinema.substring(8, 40);
              return;
            } else {
              lastNameCinema = nameCinema.substring(3, 40);
              nameCinemas = nameCinema.split(" ", 1);
            }
          };
          fullNameCinema(showTimes.tenCumRap);
          return (
            <TabPane
              key={index}
              tab={
                <>
                  <div className="detail__showtimes__Img">
                    <img src={rapDemo} alt="rapDemo" />
                  </div>
                  <div className="detail__showtimes__info">
                    <p>
                      <span className={`color${maHeThongRap}`}>
                        {nameCinemas}
                      </span>
                      {lastNameCinema}
                    </p>
                  </div>
                </>
              }
            >
              {showTimes.lichChieuPhim.slice(0, 4).map((showTime, index) => {
                let hour = "";
                let minute = "";
                const getTime = (showTime) => {
                  hour = new Date(showTime.ngayChieuGioChieu).getHours();
                  minute = new Date(showTime.ngayChieuGioChieu).getMinutes();
                };
                getTime(showTime);

                return (
                  <button
                    onClick={() => {
                      goToBookingTicket(showTime.maLichChieu);
                    }}
                    className="detail__showtimes__session"
                    key={index}
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
            </TabPane>
          );
        }
      );
    }
  };
  const renderInfoCinemaMobile = (index, idCinema, nameCinema) => {
    if (showTimes.heThongRapChieu[index].cumRapChieu) {
      return showTimes.heThongRapChieu[index].cumRapChieu.map(
        (showTimes, index) => {
          let nameCinemas = "";

          let lastNameCinema = "";
          const maHeThongRap = idCinema;

          const fullNameCinema = (nameCinema) => {
            if (maHeThongRap === "LotteCinima") {
              nameCinemas = nameCinema.split("", 5);

              lastNameCinema = nameCinema.substring(5, 30);
              return;
            }
            if (maHeThongRap === "MegaGS") {
              nameCinemas = nameCinema.split("", 6);

              lastNameCinema = nameCinema.substring(7, 40);
              return;
            }
            if (maHeThongRap === "BHDStar") {
              nameCinemas = nameCinema.split("", 8);
              lastNameCinema = nameCinema.substring(8, 40);
              return;
            } else {
              lastNameCinema = nameCinema.substring(3, 40);
              nameCinemas = nameCinema.split(" ", 1);
            }
          };
          fullNameCinema(showTimes.tenCumRap);
          return (
            <Panel
              header={
                <>
                  <div className="detail__showtimes__Img">
                    <img src={rapDemo} alt="rapDemo" />
                  </div>
                  <div className="detail__showtimes__info">
                    <p>
                      <span className={`color${maHeThongRap}`}>
                        {nameCinemas}
                      </span>
                      {lastNameCinema}
                    </p>
                  </div>
                </>
              }
              key={index}
            >
              {showTimes.lichChieuPhim.slice(0, 4).map((showTime, index) => {
                let hour = "";
                let minute = "";
                const getTime = (showTime) => {
                  hour = new Date(showTime.ngayChieuGioChieu).getHours();
                  minute = new Date(showTime.ngayChieuGioChieu).getMinutes();
                };
                getTime(showTime);

                return (
                  <button
                    onClick={() => {
                      goToBookingTicket("ô");
                    }}
                    className="detail__showtimes__session"
                    key={index}
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
        }
      );
    }
  };

  return (
    <div>
      <Tabs
        tabPosition="top"
        style={{ height: "auto" }}
        className="detail__showTimes"
        defaultActiveKey="1"
        centered
        id="showTime"
      >
        {renderCinemaList()}
      </Tabs>
    </div>
  );
};
export default memo(ShowTimes);
