import { useCallback } from "react";
import { useSelector } from "react-redux";
import { WarningOutlined } from "@ant-design/icons";
import { BookTicket } from "../../../redux/action/BookTicket";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export { React } from "react";

const RightCheckOut = () => {
  const history = useHistory();

  const filmInfo = useSelector(
    (state) => state.Cinema.listTicketRoom.thongTinPhim
  );
  const seatListBooking = useSelector((state) => state.CheckOut.seatList);
  const isBooking = useSelector((state) => state.CheckOut.isBooking);

  const total = seatListBooking.reduce((pre, cur) => pre + cur.giaVe, 0);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const renderSeatListBooking = useCallback(() => {
    if (seatListBooking) {
      return seatListBooking.map((seat, index) => {
        if (index === 0) {
          return <span key={index}> {seat.tenGhe}</span>;
        } else {
          return <span key={index}>, {seat.tenGhe}</span>;
        }
      });
    }
  }, [seatListBooking]);

  const checkOut = () => {
    Swal.fire({
      title: "Xác nhận đặt vé?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đặt Vé",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        const contentCheckOut = {
          maLichChieu: filmInfo.maLichChieu,
          danhSachVe: seatListBooking,
          taiKhoanNguoiDung: userInfo.taiKhoan,
        };
        BookTicket(contentCheckOut);
        Swal.fire("Đặt vé thành công!", "", "success");
        Swal.fire({
          title: "Đặt vé thành công!",
          icon: "success",
          showDenyButton: true,
          denyButtonText: `Xem lịch sử đặt vé`,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tiếp tục đặt vé! ",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else if (result.isDenied) {
            history.push({
              pathname: "/information",
              state: { key: "3" },
            });
          }
        });
      }
    });
  };
  if (filmInfo) {
    return (
      <>
        <div className="checkOutRight">
          <div className="contentfullright">
            <div className="total">
              <p className="cash" id="totalcost">
                {total.toLocaleString()} đ
              </p>
            </div>
            <div className="filmcontent">
              <div className="namefilm">
                <span className="btn-red">MQ</span>
                <span> {filmInfo.tenPhim}</span>
              </div>
              <div className="contentcinema">
                <div className="address">
                  <span>{filmInfo.tenCumRap}</span>
                </div>
                <div className="hour">
                  Ngày {filmInfo.ngayChieu} - {filmInfo.gioChieu} -
                  {filmInfo.tenRap}
                </div>
              </div>
              <div className="chair">
                <div className="info">
                  <span className=""> Ghế :</span>
                  {renderSeatListBooking()}
                </div>
                <div className="totalchair">{total.toLocaleString()} đ</div>
              </div>
              <div className="email field">
                <input
                  type="text"
                  id="email"
                  autoComplete="off"
                  defaultValue={`${userInfo.email}`}
                />
                <label className="label__name">
                  <span className="content__name"> E-Mail </span>
                </label>
              </div>

              <div className="phone field">
                <input
                  type="text"
                  id="phone"
                  defaultValue={`${userInfo.soDT}`}
                  autoComplete="off"
                />
                <label className="label__name">
                  <span className="content__name"> Phone </span>
                </label>
              </div>
            </div>
          </div>

          <div className="notice">
            <WarningOutlined style={{ color: "red" }} />
            <span className="title">
              Vé đã mua không thể đổi hoặc hoàn tiền
            </span>
            <br />
            <span className="title">
              Mã vé sẽ được gửi qua tin nhắn <span>ZMS</span> (tin nhắn Zalo) và
              <span> Email </span> đã nhập.
            </span>
          </div>

          {isBooking === true ? (
            <div onClick={checkOut} className="bookTicket">
              Đặt vé
            </div>
          ) : (
            <div className="bookTicket unBookTicket">Đặt vé</div>
          )}
        </div>
      </>
    );
  }
  return <></>;
};
export default RightCheckOut;
