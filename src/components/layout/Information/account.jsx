import React from "react";
import { Form, Input } from "antd";
import { updateInformation } from "../../../redux/action/userAction";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const InformationAccount = () => {
  const infoUser = JSON.parse(localStorage.getItem("userInfo"));

  const userInfo = useSelector((state) => state.Auth.userInfo);

  const onFinish = (values) => {
    Swal.fire({
      title: "Bạn muốn thay đổi thông tin??",
      showDenyButton: true,
      confirmButtonText: `Thay đổi`,
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        const user = {
          taiKhoan: values.taiKhoan,
          email: values.email,
          soDt: values.dienThoai,
          maNhom: userInfo.maNhom,
          maLoaiNguoiDung: "KhachHang",
          hoTen: values.hoTen,
          matKhau: userInfo.matKhau,
        };
        updateInformation(user);
        let timerInterval;
        Swal.fire({
          title: "Thay đổi thành công!!",
          showConfirmButton: false,
          icon: "success",
          timer: 2000,
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
            window.location.reload();
            clearInterval(timerInterval);
          },
        });
      } else if (result.isDenied) {
        Swal.fire("Thay đổi chưa được lưu !!", "", "info");
      }
    });
  };
  return (
    <div>
      <p className="information__account__title"> Thông Tin Tài Khoản </p>
      <Form
        name="normal_login"
        onFinish={onFinish}
        initialValues={{
          taiKhoan: infoUser.taiKhoan,
          matKhau: "Không có đâu ahhaha",
          hoTen: infoUser.hoTen,
          email: infoUser.email,
          dienThoai: infoUser.soDT,
        }}
      >
        <Form.Item label="Tài khoản" name="taiKhoan">
          <Input size="large" placeholder="Tài khoản" disabled />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="matKhau">
          <Input size="large" type="password" disabled />
        </Form.Item>
        <Form.Item label="Họ tên" name="hoTen">
          <Input size="large" placeholder="Họ Tên" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input size="large" placeholder="Email" disabled />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="dienThoai"
          rules={[
            {
              pattern: /^[0-9]/,

              message: "Số điện thoại không đúng định dạng",
            },
          ]}
        >
          <Input size="large" placeholder="Số Điện Thoại" />
        </Form.Item>

        <Form.Item>
          <div className="information__account__btn">
            <button type="submit">Cập Nhật</button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default InformationAccount;
