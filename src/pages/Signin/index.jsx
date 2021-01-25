import { React, useCallback, useEffect, useState } from "react";
import { Input, Form } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SmileOutlined,
  ContactsOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import group2x from "../../asset/Images/group@2x.png";
import backGround from "../../asset/Images/backgroundSignIn.jpg";
import {
  getUserList,
  userLogin,
  userSignUp,
} from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getUserList(dispatch);
  }, [dispatch]);

  const [signUp, setSignUp] = useState("");
  const [signIn, setSignIn] = useState("");

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const userList = useSelector((state) => state.Auth.userList);

  const isSignUp = useCallback(() => {
    setSignUp("form__SignUp__active");
    setSignIn("form__SignInUnActive");
  }, []);
  const isSignIn = useCallback(() => {
    setSignUp("form__SignUp__Unactive");
    setSignIn("");
  }, []);

  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinishSignIn = useCallback((user) => {
    userLogin(dispatch, history, user);
  },[dispatch,history]);
  const onFinishSignUp = useCallback((user) => {
    userSignUp(user);
  },[]);

  return (
    <>
      <div
        className="login"
        style={{
          background: `url(${backGround})`,
        }}
      >
        <div className="login__form">
          <img className="login__header" alt="bg" src={group2x} />
          <div className="login__mess">
            <p>Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!</p>
          </div>

          <div className="loginController">
            {userInfo === false ? (
              <div className="login_fail">
                <p>Sai tài khoản và mật khẩu</p>
              </div>
            ) : (
              <></>
            )}

            <div className={`form__SignUnActive ${signUp}`}>
              <p className="err__userAccount" id="err__userAccount">
                Error
              </p>

              <div>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinishSignUp}
                >
                  <Form.Item
                    name="hoTen"
                    rules={[
                      { required: true, message: "Nhập đầy đủ họ tên ạ!" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Họ Tên"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                
                  <Form.Item
                    name="taiKhoan"
                    dependencies={userList}
                    hasFeedback
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
                      placeholder="Tài khoản"
                      prefix={<SmileOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="matKhau"
                    rules={[
                      {
                        required: true,
                        message: "Nhập mật khẩu đi ạ",
                      },
                      {
                        max: 30,
                        min: 5,
                        message: "Độ dài không hợp lệ, 5-30 kí tựÏ",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Mật khẩu"
                    />
                  </Form.Item>
                  <Form.Item
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
                    <Input
                      size="large"
                      prefix={
                        <ContactsOutlined className="site-form-item-icon" />
                      }
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="dienThoai"
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
                    <Input
                      size="large"
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Số Điện Thoại"
                    />
                  </Form.Item>
                  <Form.Item>
                    <div>
                      <button type="submit" className="login__form__btn">
                        Đăng Ký
                      </button>
                    </div>
                  </Form.Item>
                </Form>

                <div className="login__form__footer">
                  <p>
                    Bạn đã có tài khoảng?
                    <span
                      onClick={() => {
                        isSignIn();
                      }}
                    >
                      Đăng nhập
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className={`form__SignIn ${signIn}`}>
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
                    <button type="submit" className="login__form__btn">
                      Đăng Nhập
                    </button>
                  </div>
                </Form.Item>
              </Form>
              <div className="login__form__footer">
                <p>
                  Bạn chưa có tài khoảng?
                  <span
                    onClick={() => {
                      isSignUp();
                    }}
                  >
                    Đăng Ký
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="login__close"></div>
        </div>
      </div>
    </>
  );
};
export default Signin;

// <>
//   <div
//     className="login"
//     style={{
//       background: `url(${backGround})`,
//     }}
//   >
//     <div className="login__form">
//       <img className="login__header" src={group2x} />
//       <div className="login__mess">
//         <p>
//           Đăng nhập để được nhiều ưu đãi, mua vé
//           và bảo mật thông tin!
//         </p>
//       </div>
//       <div className="loginController">
//         {signUp ? (
//           <>
//             <form onSubmit={handleSignIn()}>
//               <Input
//                 size="large"
//                 placeholder="Full Name"
//                 style={{ marginBottom: 20 }}
//                 prefix={<UserOutlined />}
//               />
//               <Input
//                 size="large"
//                 placeholder="Username"
//                 style={{ marginBottom: 20 }}
//                 prefix={<UserOutlined />}
//               />
//               <Input
//                 size="large"
//                 placeholder="Password"
//                 type="password"
//                 style={{ marginBottom: 20 }}
//                 prefix={<LockOutlined />}
//               />
//               <Input
//                 size="large"
//                 placeholder="Email"
//                 style={{ marginBottom: 20 }}
//                 prefix={<UserOutlined />}
//               />
//               <Input
//                 size="large"
//                 placeholder="Phone"
//                 type="password"
//                 style={{ marginBottom: 10 }}
//                 prefix={<LockOutlined />}
//               />
//             </form>
//             <div>
//               <button className="login__form__btn">Đăng Ký</button>
//             </div>
//             <div className="login__form__footer">
//               <p>
//                 Bạn đã có tài khoảng?
//                 <span
//                   onClick={() => {
//                     isSignUp();
//                   }}
//                 >
//                   Đăng nhập
//                 </span>
//               </p>
//             </div>
//           </>
//         ) : (
//           <>
//             <form onSubmit={handleSignUp()}>
//               <Input
//                 size="large"
//                 placeholder="Username"
//                 style={{ marginBottom: 20 }}
//                 prefix={<UserOutlined />}
//               />
//               <Input
//                 size="large"
//                 placeholder="Password"
//                 type="password"
//                 style={{ marginBottom: 20 }}
//                 prefix={<LockOutlined />}
//               />
//               <div>
//                 <button className="login__form__btn">Đăng Nhập</button>
//               </div>
//               <div className="login__form__footer">
//                 <p>
//                   Bạn chưa có tài khoảng?
//                   <span
//                     onClick={() => {
//                       isSignUp();
//                     }}
//                   >
//                     Đăng Ký
//                   </span>
//                 </p>
//               </div>
//             </form>
//           </>
//         )}
//       </div>

//       <div className="login__close"></div>
//     </div>
//   </div>
// </>
