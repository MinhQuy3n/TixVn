import React from "react";
import { Form, Input } from "antd";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateInformation } from "../../../redux/action/userAction";

const ChangePass = () => {
  const userPassWord = useSelector((state) => state.Auth.userInfo.matKhau);
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
          taiKhoan: userInfo.taiKhoan,
          email: userInfo.email,
          soDt: userInfo.soDT,
          maNhom: userInfo.maNhom,
          maLoaiNguoiDung: "KhachHang",
          hoTen: userInfo.hoTen,
          matKhau: values.password,
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
    <div className="Information__changePassword">
      <p className="information__changePassword__title"> Thay Đổi Mật Khẩu</p>

      <Form onFinish={onFinish} name="changePassWord">
        <Form.Item
          name="input"
          label="Mật khẩu củ"
          dependencies={[userPassWord]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu củ!! ",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || userPassWord === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Nhập mật khẩu!!",
            },
            {
              max: 30,
              min: 5,
              message: "Độ dài không hợp lệ, 5-30 kí tựÏ",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xác nhận lại mật khẩu!!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div className="information__changePass__btn">
            <button type="submit">Thay đổi</button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ChangePass;
