import { Button, Col, Form, Input, Modal, Row, Space, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/LoginSlice";
import axios from "axios";
import ForgetComponent from "./ForgetComponent";

const LoginComponent = ({ setShowForgetPassword }) => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const [ShowLogoutModal, setShowLogoutModal] = useState(false);

  const signIn = useSelector((state) => state.login.userDetail);

  const showLoginPage = () => {
    setIsLogin(true);
  };
  const loginModalClose = () => {
    setIsLogin(false);
  };

  const handleLogin = (values) => {
    setIsLogin(false);

    axios
      .get("https://sampleap3b-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        let userDetailsArray = Object.values(response.data);
        console.log("user details", userDetailsArray);

        let userDetail = userDetailsArray.find(
          (user) => user.email === values.email
        );
        if (userDetail) {
          if (userDetail.password === values.password) {
            message.success("logged in successfully");
            dispatch(login(userDetail));
          } else {
            message.error("invalid credential");
          }
        } else {
          message.error("user not found");
        }
      })
      .catch((error) => {
        message.error("something went wrong");
      });
  };
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const handleOk = () => {
    setShowLogoutModal(false);
    dispatch(logout());
  };
  const openForgetPassword = () => {
    setShowForgetPassword(true);
    // setShowForgetComponent(true);
    setIsLogin(false);
  };
  const validatePassword = (_, value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!value || passwordRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
    );
  };
  const validateEmail = (_, value) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Please enter a valid email address");
  };
  return (
    <>
      {signIn ? (
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ width: "100px" }}
        >
          Logout
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={showLoginPage}
          style={{ width: "100px" }}
        >
          Login
        </Button>
      )}
      <Modal
        title="Logout Confirmation"
        open={ShowLogoutModal}
        onOk={handleOk}
        onCancel={() => setShowLogoutModal(false)}
        closable={false}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
      <Modal
        title="LOGIN"
        open={isLogin}
        onCancel={loginModalClose}
        footer={null}
        closable={false}
      >
        <Form
          onFinish={handleLogin}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Row justify="end">
              <Col span={4}>
                <Button type="link" onClick={openForgetPassword}>
                  Forgot Password?
                </Button>
              </Col>
            </Row>
          </Form.Item>
          {/* <Form.Item> */}
          <Row justify="end">
            <Space>
              <Col span={4}>
                <Button onClick={loginModalClose} style={{ width: "100px" }}>
                  Cancel
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100px" }}
                >
                  Login
                </Button>
              </Col>
            </Space>
          </Row>
          {/* </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
export default LoginComponent;
