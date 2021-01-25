import {
  domain,
  GET_CINEMA,
  GET_INFO_CINEMA,
  GET_LIST_TICKET_ROOM,
} from "../../util/setting/config";
import request from "../../util/setting/request";

export const getListCinema = (dispatch) => {
  request(`${domain}/api/QuanLyRap/LayThongTinHeThongRap`, "GET")
    .then((res) => {
      dispatch({ type: GET_CINEMA, payload: res.data });
    })
    .catch((err) => {});
};

export const getInfoCinema = (dispatch, cinema) => {
  request(
    `${domain}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinema}&maNhom=GP05`,
    "GET"
  )
    .then((res) => {
      dispatch({ type: GET_INFO_CINEMA, payload: res.data });
    })
    .catch((err) => {});
};
export const getListTicketRoom = (dispatch, idshowTime) => {
  request(
    `${domain}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idshowTime}`,
    "GET"
  )
    .then((res) => {
      dispatch({ type: GET_LIST_TICKET_ROOM, payload: res.data });
    })
    .catch((err) => {});
};
