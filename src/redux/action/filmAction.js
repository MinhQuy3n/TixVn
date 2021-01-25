import {
  domain,
  GET_DETAIL_FILM,
  GET_FILM_SHOW_TIME,
  GET_LIST_FILM,
} from "../../util/setting/config";
import request from "../../util/setting/request";
export const getListFilm = (dispatch) => {
  request(`${domain}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05`, "GET")
    .then((res) => {
      dispatch({ type: GET_LIST_FILM, payload: res.data });
    })
    .catch((err) => {});
};

export const getFilmDetail = (dispatch, id) => {
  request(`${domain}/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`, "GET")
    .then((res) => {
      dispatch({ type: GET_DETAIL_FILM, payload: res.data });
    })
    .catch((err) => {});
};
export const getFilmShowTime = (dispatch, id) => {
  request(
    `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    "GET"
  )
    .then((res) => {
      dispatch({ type: GET_FILM_SHOW_TIME, payload: res.data });
    })
    .catch((err) => {});
};
