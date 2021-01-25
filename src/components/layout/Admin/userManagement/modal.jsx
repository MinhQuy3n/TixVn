import { Input, Form, Select, Modal } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addUserByAdmin,
  updateInformationByAdmin,
} from "../../../../redux/action/adminAction";
const { Option } = Select;

const Modals = ({ userUpdating, setIsModalVisible, ...props }) => {

  const dispatch = useDispatch();
  const [screen, setScreen] = useState(window.screen.width);

  useEffect(() => {
    setScreen(window.screen.width);
  }, [screen]);
  const onFinish = (value) => {
    if (userUpdating === undefined) {
      addUserByAdmin(dispatch, value);
    } else {
      updateInformationByAdmin(value);
    }
    setTimeout(() => {
      setIsModalVisible(false);
    }, 1500);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={`${
          userUpdating === undefined ? "Thêm Người Dùng" : "Cập Nhật Người Dùng"
        }`}
        visible="true"
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={1000}
      >
        <div>
          <Form
            className="grid grid-flow-row grid-cols-2 grid-rows-3 gap-4"
            name="normal_login"
            layout={`${screen < 783 ? "vertical" : "horizontal"}`}

            onFinish={onFinish}
            initialValues={
              userUpdating === undefined
                ? {}
                : {
                    taiKhoan: userUpdating.taiKhoan,
                    matKhau: userUpdating.matKhau,
                    hoTen: userUpdating.hoTen,
                    email: userUpdating.email,
                    soDt: userUpdating.soDt,
                    maLoaiNguoiDung: userUpdating.maLoaiNguoiDung,
                  }
            }
          >
            {userUpdating === undefined ? (
              <>
                <Form.Item
                  label="Tài khoản"
                  name="taiKhoan"
                  rules={[
                    {
                      max: 20,
                      message: "Tài khoản quá dài",
                    },
                    {
                      min: 5,
                      message: "Tài khoản phải có trên 5 kí tự",
                    },
                    {
                      required: true,
                      message: "Nhập tài khoản đi ạ!",
                    },
                    {
                      pattern: /^[A-Za-z0-9_\.]{0,20}$/,
                      message: "Tài Khoản không được ký tự đặc biệt ",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    className="focus:outline-none"
                    placeholder="Tài khoản"
                  />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="matKhau"
                  rules={[
                    {
                      required: true,
                      message: "Nhập mật khẩu đi ạ!",
                    },
                    {
                      max: 30,
                      min: 5,
                      message: "Độ dài không hợp lệ, 5-30 kí tự",
                    },
                  ]}
                >
                  <Input.Password size="large" type="password" />
                </Form.Item>
                <Form.Item
                  label="Họ tên"
                  name="hoTen"
                  rules={[{ required: true, message: "Nhập đầy đủ họ tên ạ!" }]}
                >
                  <Input size="large" placeholder="Họ Tên" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Nhập email đi ạ!",
                    },
                    {
                      type: "email",
                      message: "Đây không phải định dạng Email!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="soDt"
                  rules={[
                    {
                      pattern: /^[0-9]\d{2}[2-9]\d{2}\d{4}$/,

                      message: "Số điện thoại không đúng định dạng",
                    },
                    {
                      required: true,
                      message: "Nhập số điện thoại đi ạ!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Số Điện Thoại" />
                </Form.Item>
                <Form.Item label="Loại Người Dùng">
                  <Input.Group compact>
                    <Form.Item
                      name="maLoaiNguoiDung"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Chọn loại người dùng đi ạ!",
                        },
                      ]}
                    >
                      <Select placeholder="Chọn loại người dùng">
                        <Option value="KhachHang">Khách Hàng</Option>
                        <Option value="QuanTri">Quản Trị</Option>
                      </Select>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Form.Item className="row-span-2 col-span-2 text-center	">
                  <button
                    className="bg-white text-red-600 text-base font-semibold px-14 py-3 rounded-lg transition-all hover:text-red-400 transform hover:scale-110 motion-reduce:transform-none focus:outline-none"
                    type="submit"
                  >
                    Thêm
                  </button>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item label="Tài khoản" name="taiKhoan">
                  <Input size="large" placeholder="Tài khoản" disabled />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="matKhau">
                  <Input.Password size="large" type="password" />
                </Form.Item>
                <Form.Item label="Họ tên" name="hoTen">
                  <Input size="large" placeholder="Họ Tên" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="soDt">
                  <Input size="large" placeholder="Số Điện Thoại" />
                </Form.Item>
                <Form.Item label="Người dùng">
                  <Input.Group compact>
                    <Form.Item name="maLoaiNguoiDung" noStyle>
                      <Select placeholder="Select province">
                        <Option value="KhachHang">Khách Hàng</Option>
                        <Option value="QuanTri">Quản Trị</Option>
                      </Select>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Form.Item className="row-span-2 col-span-2 text-center	">
                  <button
                    className="bg-red-600 text-lg	text-white text-base font-semibold px-20 py-3 rounded-lg transition-all focus:outline-none"
                    type="submit"
                  >
                    Cập Nhật
                  </button>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default memo(Modals);





