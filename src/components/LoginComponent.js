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

const LoginComponent = ({ setShowForgetPassword }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.login.userDetail);
  const isLoginModalVisible = useSelector(selectLoginModalVisibility);

  const handleShowLoginModal = () => {
    dispatch(showLoginModal());
  };

  const handleHideLoginModal = () => {
    dispatch(hideLoginModal());
  };


  const handleLogin = (values) => {
    axios
      .get("https://sampleap3b-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        let userDetailsArray = Object.values(response.data);
        console.log("user details", userDetailsArray);

        let userDetail = userDetailsArray.find(
          (user) =>
            user.email === values.usernameOrEmail ||
            user.username === values.usernameOrEmail
        );
        localStorage.setItem("user", JSON.stringify(userDetail));
        if (userDetail) {
          if (userDetail.password === values.password) {
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
            dispatch(login(userDetail));
            dispatch(hideLoginModal());
          } else {
            messageApi.open({
              type: "error",
              key: "msg-key",
              content: (
                <div className="msg-error-container">
                  Invalid password or username
                </div>
              ),
              icon: <></>,
              className: "custom-success-msg",
              style: {
                marginTop: "3vh",
              },
            });
            dispatch(showLoginModal());
          }
        } else {
          message.error("user not found");
          dispatch(showLoginModal());
        }
      })
      .catch((error) => {
        message.error(error, "Network error");
        dispatch(showLoginModal());
      });
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
            {signIn.username && (
              <>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Popover content={<MyProfilePage />} trigger="hover">
                    <Avatar
                      size="default"
                      style={{ backgroundColor: "#265735", cursor: "pointer" }}
                      icon={<UserOutlined />}
                    />
                  </Popover>
                  <span style={{ marginLeft: "15px" }}>{signIn.username}</span>
                </span>
              </>
            )}
          </Col>
        </Row>
      ) : (
        <Button
          type="primary"
          onClick={handleShowLoginModal}
          style={{ width: "100px" }}
        >
          Login
        </Button>
      )}
      <div>{contextHolder}</div>

      <Modal
        title="LOGIN"
        open={isLoginModalVisible}
        onCancel={handleHideLoginModal}
        footer={null}
        closable={false}
        width={570}
      >
        <Form
          form={form}
          onFinish={handleLogin}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Username or Email"
            name="usernameOrEmail"
            rules={[
              {
                required: true,
                message: "Please enter Username or Email",
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
          <Row style={{ marginBottom: "20px" }}>
            <Col span={6} offset={18}>
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
