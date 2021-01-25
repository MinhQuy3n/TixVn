import React, { memo, useState } from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { iconURL } from "../../../../asset/iconfont";
import { useDispatch } from "react-redux";
import { CHECK_OUT, UN_CHECK_OUT } from "../../../../util/setting/config";

const SeatItem = ({ seat, index, ...props }) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: iconURL,
  });
  const dispatch = useDispatch();
  const [type, setType] = useState(seat.loaiGhe);
  const [isBooking, setIsBooking] = useState(false);
  const bookingTicket = (seatInfo) => {
    if (isBooking === false) {
      dispatch({ type: CHECK_OUT, payload: seatInfo });
      setIsBooking(!isBooking);
      setType("Booking");
    } else {
      dispatch({ type: UN_CHECK_OUT, payload: seatInfo });
      setIsBooking(!isBooking);
      if (seat.loaiGhe === "Thuong") {
        setType("Thuong");
      } else {
        setType("Vip");
      }
    }
  };
  return (
    <>
      {seat.daDat ? (
        <IconFont
          className="icon"
          style={{ cursor: "no-drop" }}
          type="icon-seat-booked"
        />
      ) : (
        <IconFont
          onClick={() => {
            bookingTicket(seat);
          }}
          className="icon"
          style={{ cursor: "pointer" }}
          type={`icon-seat-${type}`}
        />
      )}

      {(index + 1) % 16 === 0 ? <br /> : <></>}
    </>
  );
};
export default memo(SeatItem);
