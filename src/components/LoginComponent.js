import { Button, Col, Form, Input, Modal, Row, Space, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/LoginSlice";
import axios from "axios";
import ForgetComponent from "./ForgetComponent";

const LoginComponent = ({ setShowForgetPassword, setLoginModal }) => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const [ShowLogoutModal, setShowLogoutModal] = useState(false);

  const signIn = useSelector((state) => state.login.userDetail);

  const showLoginPage = () => {
    // setLoginModal(false);
    setIsLogin(true);
  };
  const loginModalClose = () => {
    setIsLogin(false);
    setLoginModal(true);
  };

  const handleLogin = (values) => {
    axios
      .get("https://sampleap3b-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        let userDetailsArray = Object.values(response.data);
        console.log("user details", userDetailsArray);

        let userDetail = userDetailsArray.find(
          (user) => user.email === values.email
        );
        localStorage.setItem("user", JSON.stringify(userDetail));
        if (userDetail) {
          if (userDetail.password === values.password) {
            message.success("logged in successfully");
            dispatch(login(userDetail));
            setIsLogin(false);
          } else {
            message.error("invalid credential");
            setIsLogin(true);
          }
        } else {
          message.error("user not found");
          setIsLogin(true);
        }
      })
      .catch((error) => {
        message.error(error, "something went wrong");
        setIsLogin(true);
      });
  };
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const handleOk = () => {
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    dispatch(logout());
  };
  const openForgetPassword = () => {
    setShowForgetPassword(true);
    setIsLogin(false);
  };

  return (
    <>
      {signIn ? (
        <Row justify="end">
          <Col span={4}>
            <Button
              type="primary"
              onClick={handleLogout}
              style={{ width: "100px" }}
            >
              Logout
            </Button>
          </Col>
        </Row>
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
        // className="logout-modal-centered"
        centered
        width={350}
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
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email/Username"
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
