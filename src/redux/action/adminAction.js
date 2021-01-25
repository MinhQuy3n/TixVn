import request from "../../util/setting/request";
import Swal from "sweetalert2";
import {
  ADD_USER,
  ADMIN_SET_TOKEN,
  DELETE_USER,
  domain,
} from "../../util/setting/config";
import { getListFilm } from "./filmAction";

export const updateInformationByAdmin = (infoUpdate) => {
  request(`${domain}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, "PUT", {
    ...infoUpdate,
    maNhom: "GP05",
  })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Cập Nhật Thành Công",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((err) => {


    });
};
export const deleteUserByAdmin = (dispatch, accountUser) => {
  request(
    `${domain}/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${accountUser}`,
    "DELETE"
  )
    .then((res) => {
      dispatch({ type: DELETE_USER, payload: accountUser });
      Swal.fire(
        "Xóa Thành Công!",
        `${accountUser} đã được xóa khỏi danh sách`,
        "success"
      );
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Xoá Không Thành Công!",
        html: "Người dùng này đã đặt vé xem phim không thể xóa!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
};
export const addUserByAdmin = (dispatch, value) => {
  request(`${domain}/api/QuanLyNguoiDung/ThemNguoiDung`, "POST", {
    ...value,
    maNhom: "GP05",
  })
    .then((res) => {
      dispatch({ type: ADD_USER, payload: value });
      Swal.fire(
        "Thêm thành công!",
        `${value.taiKhoan} đã được thêm thành công!`,
        "success"
      );
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Tạo Không Thành Công!",
        html: `${err.response.data}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

export const updateFilmByAdmin = (dispatch, value, hinhAnh) => {
  request(`${domain}/api/QuanLyPhim/CapNhatPhim`, "POST", {
    ...value,
    maNhom: "GP05",
    hinhAnh: hinhAnh,
  })
    .then((res) => {

      value.hinhAnh.upload !== undefined && UploadImg(value, hinhAnh);

      Swal.fire({
        icon: "success",
        title: "Sửa Thành Công!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        getListFilm(dispatch);
      }, 1000);
    })
    .catch((err) => {

      Swal.fire({
        icon: "error",
        title: "Sửa Không Thành Công!",
        html: `${err.response.data}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

export const deleteFilmByAdmin = (dispatch, idFilm, tenPhim) => {
  request(`${domain}/api/QuanLyPhim/XoaPhim?MaPhim=${idFilm}`, "DELETE")
    .then((res) => {


      Swal.fire({
        icon: "success",
        title: "Xóa Thành Công!",
        html: `${tenPhim} đã được xóa khỏi danh sách`,
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        getListFilm(dispatch);
      }, 1000);
    })
    .catch((err) => {

      Swal.fire({
        icon: "error",
        title: "Xoá Không Thành Công!",
        html: `${err.response.data}`,
        showConfirmButton: false,
        timer: 1000,
      });
    });
};

export const createFilmByAdmin = (dispatch, value) => {
  let frm = new FormData();

  let file = value.hinhAnh.upload[0].originFileObj;

  frm.append("hinhAnh", file);
  frm.append("maPhim", value.maPhim);
  frm.append("tenPhim", value.tenPhim);
  frm.append("maNhom", "GP05");
  frm.append("biDanh", value.biDanh);
  frm.append("moTa", value.moTa);
  frm.append("ngayKhoiChieu", value.ngayKhoiChieu);
  frm.append("danhGia", value.danhGia);
  frm.append("trailer", value.trailer);

  request(`${domain}/api/QuanLyPhim/ThemPhimUploadHinh`, "POST", frm)
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Thêm Thành Công!",
        html: `Phim ${value.tenPhim} đã được thêm vào danh sách`,
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        getListFilm(dispatch);
      }, 1000);
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Thêm Không Thành Công!",
        html: `${err.response}`,
        showConfirmButton: false,
        timer: 1000,
      });
    });
};
const UploadImg = (value) => {
  let frm = new FormData();

  let file = value.hinhAnh.upload[0].originFileObj;

  frm.append("hinhAnh", file);
  frm.append("maPhim", value.maPhim);
  frm.append("tenPhim", value.tenPhim);
  frm.append("maNhom", "GP05");
  frm.append("biDanh", value.biDanh);
  frm.append("moTa", value.moTa);
  frm.append("ngayKhoiChieu", value.ngayKhoiChieu);
  frm.append("danhGia", value.danhGia);
  frm.append("trailer", value.trailer);

  request(`${domain}/api/QuanLyPhim/CapNhatPhimUpload`, "POST", frm)
    .then((res) => {})
    .catch((err) => {});
};

export const adminSignin = (dispatch, history, user) => {
  request(`${domain}/api/QuanLyNguoiDung/DangNhap`, "POST", user)
    .then((res) => {

      if (res.data.maLoaiNguoiDung === "QuanTri") {

        localStorage.setItem("adminInfo", JSON.stringify(res.data));
        localStorage.setItem(
          "accessAdminToken",
          JSON.stringify(res.data.accessToken)
        );

        dispatch({
          type: ADMIN_SET_TOKEN,
          payload: res.data,
        });
        let timerInterval;
        Swal.fire({
          title: "Đăng Nhập Thành Công",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          timerProgressBar: false,

          icon: "success",
          backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
          willOpen: () => {
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
            history.replace("/admin");
          },
        });
      } else {
        dispatch({
          type: ADMIN_SET_TOKEN,
          payload: false,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: ADMIN_SET_TOKEN,
        payload: false,
      });

    });
};
