import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";
import { useSelector } from "react-redux";

const handleClone = (HistoryBooked) => {
  let cloneHistoryBooked = [];
  HistoryBooked.map((ticket, index) => {
    return cloneHistoryBooked.push({
      ...ticket,
      giaVe: (ticket.giaVe * ticket.danhSachGhe.length).toLocaleString(),
      danhSachGhe: `${ticket.danhSachGhe.map((seat, index) => {
        return seat.tenGhe;
      })}`,
      key: index + 1,
      ngayDat: `${new Date(ticket.ngayDat).getHours()}:${new Date(
        ticket.ngayDat
      ).getMinutes()} ~ (${new Date(ticket.ngayDat).getDate()}/ ${
        new Date(ticket.ngayDat).getMonth() + 1
      } )`,
    });
  });
  return cloneHistoryBooked;
};

const HistoryBooked = () => {
  const HistoryBooked = useSelector(
    (state) => state.Auth.userInfo.thongTinDatVe
  );
  let listHisTicket = [];
  if (HistoryBooked) {
    listHisTicket = handleClone(HistoryBooked);
  }

  return (
    <>
      <Table dataSource={listHisTicket}>
        <Column title="Phim" dataIndex="tenPhim" key="tenPhim" />
        <Column title="Ngày Đặt" dataIndex="ngayDat" key="maVe" />

        <Column title="Mã Vé" dataIndex="maVe" key="maVe" />
        <Column title="Số Ghế" dataIndex="danhSachGhe" key="danhSachGhe" />
        <Column title="Giá" dataIndex="giaVe" key="giaVe" />
      </Table>
    </>
  );
};
export default HistoryBooked;
