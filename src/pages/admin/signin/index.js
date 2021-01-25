import { Input, Form } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, LockOutlined, GitlabOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { adminSignin } from "../../../redux/action/adminAction";
const SignInAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const adminToken = useSelector((state) => state.Auth.adminToken);

  const onFinishSignIn = useCallback(
    (user) => {
      adminSignin(dispatch, history, user);
    },
    [dispatch, history]
  );

  return (
    <>
      <div className="signInAdmin">
        <div className="signInAdmin__form">
          <div className="signInAdmin__header mb-8">
            <GitlabOutlined style={{ color: "#f87171", fontSize: 64 }} />
            <span className="signInAdmin__header__title text-xl font-bold">
              Đăng Nhập
            </span>
          </div>

          <div className="login_fail text-red-600 texl-xs w-full h-14">
            {adminToken === false ? (
              <p>Hãy đăng nhập tài khoản admin</p>
            ) : (
              <></>
            )}
          </div>

          <div className="">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinishSignIn}
            >
              <Form.Item
                name="taiKhoan"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="matKhau"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Password"
                  type="password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <div>
                  {/* bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 */}
                  <button
                    type="submit"
                    className="loginAdmin__form__btn text-xl text-white font-bold transition duration-500 ease-in-out bg-red-400 to-blue-600 hover:bg-red-600 transform hover:-translate-y-1 py-4 px-7 rounded-md"
                  >
                    Đăng Nhập
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignInAdmin;
