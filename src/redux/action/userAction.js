import {
  domain,
  SET_TOKEN,
  GET_LIST_USER,
  INFO_USER,
} from "../../util/setting/config";
import request from "../../util/setting/request";
import Swal from "sweetalert2";

export const userLogin = (dispatch, history, user) => {
  request(`${domain}/api/QuanLyNguoiDung/DangNhap`, "POST", user)
    .then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));

      dispatch({
        type: SET_TOKEN,
        payload: res.data,
      });
      let timerInterval;
      Swal.fire({
        title: "Đăng Nhập Thành Công",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
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
          history.replace("/");
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_TOKEN,
        payload: false,
      });
    });
};

export const userSignUp = (user) => {
  request(`${domain}/api/QuanLyNguoiDung/DangKy`, "POST", {
    ...user,
    soDt: user.dienThoai,
    maNhom: "GP05",
    maLoaiNguoiDung: "khachHang",
  })
    .then((res) => {
      let timerInterval;
      Swal.fire({
        title: "Đăng Kí Thành Công",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
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
          window.location.reload();
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });
    })
    .catch((err) => {
      const error = document.getElementById("err__userAccount");
      error.innerText = err.response.data;
      error.style.visibility = "visible";
    });
};

export const getUserList = (dispatch) => {
  request(
    `${domain}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP05`,
    "GET"
  )
    .then((res) => {
      dispatch({
        type: GET_LIST_USER,
        payload: res.data,
      });
    })
    .catch((err) => {});
};

export const getUserInfo = (dispatch, accUser) => {
  request(`${domain}/api/QuanLyNguoiDung/ThongTinTaiKhoan`, "POST", {
    taiKhoan: accUser,
  })
    .then((res) => {
      dispatch({
        type: INFO_USER,
        payload: res.data,
      });
    })
    .catch((err) => {});
};

export const updateInformation = (infoUpdate) => {
  request(
    `${domain}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    "PUT",
    infoUpdate
  )
    .then((res) => {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...infoUpdate, matKhau: null })
      );
    })
    .catch((err) => {});
};
