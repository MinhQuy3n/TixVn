import React, { useCallback, useState } from "react";
import { Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getFilmShowTime } from "../../../redux/action/filmAction";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import ImgNofi from "../../../asset/Images/Post-notification.png";

const HomeTool = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.Auth.token);

  const { Option } = Select;
  const [maRap, setMaRap] = useState();
  const [ngayXem, setNgayXem] = useState();
  const [idShowTime, setIdShowTime] = useState();

  const handleChange = useCallback(
    (value) => {
      getFilmShowTime(dispatch, value);
    },
    [dispatch]
  );
  const handleSelectMaRap = useCallback((value) => {
    setMaRap(value);
  }, []);
  const handleSelectNgayXem = useCallback((value) => {
    setNgayXem(value);
  }, []);
  const handleSelectShowTime = useCallback((value) => {
    setIdShowTime(value);
  }, []);

  const filmList = useSelector((state) => state.Film.listFilm);
  const cinemaList = useSelector(
    (state) => state.Film.showTimes.heThongRapChieu
  );
  const renderFilmList = useCallback(() => {
    return filmList.map((film, index) => {
      return (
        <Option key={index} value={film.maPhim}>
          {film.tenPhim}
        </Option>
      );
    });
  }, [filmList]);
  const renderCinema = useCallback(() => {
    if (cinemaList !== undefined) {
      return cinemaList.map((cinema, index) => {
        return (
          <Option key={index} value={cinema.maHeThongRap}>
            {cinema.tenHeThongRap}
          </Option>
        );
      });
    } else {
      return <Option value="null">Vui lòng chọn phim</Option>;
    }
  }, [cinemaList]);
  const renderShowTimes = useCallback(() => {
    if (cinemaList !== undefined) {
      return cinemaList.map((cinema, index) => {
        if (cinema.maHeThongRap === maRap) {
          return cinema.cumRapChieu.map((cumRap, index) => {
            return cumRap.lichChieuPhim.slice(0, 4).map((showTime, index) => {
              const date = new Date(showTime.ngayChieuGioChieu);
              return (
                <Option index={index} value={showTime.maLichChieu}>
                  {`${date.getHours()} : ${date.getMinutes()}`}
                </Option>
              );
            });
          });
        }
      });
    }
  }, [cinemaList, maRap]);
  const handleBuy = useCallback(() => {
    if (userInfo) {
      if (maRap && ngayXem && idShowTime) {
        history.push(`/checkout/` + idShowTime);
      }
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
  }, [history, idShowTime, userInfo, maRap, ngayXem]);
  return (
    <>
      <div className="homeTool">
        <Select
          className="homeTool_item"
          defaultValue="Phim"
          style={{ width: "30%" }}
          onChange={handleChange}
        >
          {renderFilmList()}
        </Select>
        <Select
          className="homeTool_item"
          defaultValue="Rạp"
          style={{ width: "15%" }}
          onChange={handleSelectMaRap}
        >
          {renderCinema()}
        </Select>
        <Select
          className="homeTool_item"
          defaultValue="Ngày Xem"
          style={{ width: "15%" }}
          onChange={handleSelectNgayXem}
        >
          {maRap !== undefined ? (
            <>
              <Option value="01/02/2021">01/02/2021</Option>
              <Option value="02/02/2021">02/02/2021</Option>
              <Option value="03/02/2021">03/02/2021</Option>
              <Option value="04/02/2021">04/02/2021</Option>
              <Option value="05/02/2021">05/02/2021</Option>
            </>
          ) : (
            <Option value="null">Vui lòng chọn phim và rạp</Option>
          )}
        </Select>
        <Select
          className="homeTool_item no-border"
          defaultValue="Suất Chiếu"
          style={{ width: "15%" }}
          onChange={handleSelectShowTime}
        >
          {maRap !== undefined && ngayXem !== undefined ? (
            renderShowTimes()
          ) : (
            <Option value="null">Vui lòng chọn phim,rạp, và ngày xem</Option>
          )}
        </Select>
        <Button className="homeTool__btnBuy" onClick={handleBuy} type="primary">
          Mua Vé
        </Button>
      </div>
    </>
  );
};
export default HomeTool;
