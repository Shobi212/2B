import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  Space,
  message,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/LoginSlice";
import axios from "axios";
import ForgetComponent from "./ForgetComponent";
import { UserOutlined } from "@ant-design/icons";
import {
  hideLoginModal,
  selectLoginModalVisibility,
  showLoginModal,
} from "../store/slice/ModalSlice";
import MyProfilePage from "./MyProfilePage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase";
import "../design/Styles.scss";

const LoginComponent = ({ setShowForgetPassword }) => {
  const [messageApi, contextHolder] = message.useMessage();
  // const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector((state) => state.login.userDetail);
  const isLoginModalVisible = useSelector(selectLoginModalVisibility);

  const handleShowLoginModal = () => {
    dispatch(showLoginModal());
  };

  const handleHideLoginModal = () => {
    dispatch(hideLoginModal());
  };

  const handleLogin = (values) => {
    const userDetailsArray = [];
    setLoading(true);
    getDocs(collection(db, "users"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          userDetailsArray.push(doc.data());
        });

        let userDetail = userDetailsArray.find(
          (user) =>
            user.email === values.usernameOrEmail ||
            user.username === values.usernameOrEmail
        );

        if (userDetail) {
          if (userDetail.password === values.password) {
            localStorage.setItem("user", JSON.stringify(userDetail));
            messageApi.open({
              type: "success",
              key: "msg-key",
              content: (
                <div className="msg-container">
                  Welcome, {userDetail?.username}
                </div>
              ),
              icon: <></>,
              className: "custom-success-msg",
              style: {
                marginTop: "3vh",
              },
            });
            setLoading(false);
            dispatch(login(userDetail));
            dispatch(hideLoginModal());
          } else {
            messageApi.open({
              type: "error",
              key: "msg-key",
              content: <div className="msg-container">Invalid password</div>,
              icon: <></>,
              className: "custom-error-msg",
              style: {
                marginTop: "3vh",
              },
            });
            setLoading(false);
          }
        } else {
          messageApi.open({
            type: "error",
            key: "msg-key",
            content: <div className="msg-container">User not found</div>,
            icon: <></>,
            className: "custom-error-msg",
            style: {
              marginTop: "3vh",
            },
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          key: "msg-key",
          content: <div className="msg-container">Something went wrong</div>,
          icon: <></>,
          className: "custom-error-msg",
          style: {
            marginTop: "3vh",
          },
        });
      });
    setLoading(false);
  };

  const openForgetPassword = () => {
    setShowForgetPassword(true);
    setIsLogin(false);
  };

  return (
    <>
      {contextHolder}
      {loggedInUserInfo ? (
        // <Row justify="end">
        //   <Col span={4}>
        <div style={{ marginLeft: "130px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              right: "0",
            }}
          >
            {loggedInUserInfo.username && (
              <span>{loggedInUserInfo.username}</span>
            )}
            <Popover
              content={<MyProfilePage />}
              trigger="hover"
              placement="bottomRight"
            >
              <Avatar
                size="default"
                style={{
                  backgroundColor: "#1c4139",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                icon={<UserOutlined />}
              />
            </Popover>
          </span>
        </div>
      ) : (
        //   </Col>
        // </Row>
        <Button
          type="primary"
          onClick={handleShowLoginModal}
          style={{ width: "100px" }}
        >
          Login
        </Button>
      )}

      {isLoginModalVisible && (
        <Modal
          title="Log In"
          open
          style={{
            top: 150,
          }}
          onCancel={handleHideLoginModal}
          footer={null}
          closable={false}
          width={500}
        >
          <Form
            name="loginForm"
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
              label="Username or Email"
              name="usernameOrEmail"
              rules={[
                {
                  required: true,
                  message: "Please enter username or email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "0px" }}
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
            <Row style={{ margin: "6px 0px 20px 0px" }}>
              <Col span={6} offset={17}>
                <Button type="link" onClick={openForgetPassword}>
                  Forgot Password?
                </Button>
              </Col>
            </Row>
            <Row justify="end">
              <Space>
                <Col span={4}>
                  <Button
                    onClick={handleHideLoginModal}
                    style={{ width: "100px" }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100px" }}
                  >
                    Login
                  </Button>
                </Col>
              </Space>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  );
};
export default LoginComponent;
