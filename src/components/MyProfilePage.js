import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Result,
  Row,
  Space,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/LoginSlice";
import {
  ExclamationCircleOutlined,
  UserOutlined,
  ArrowRightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const MyProfilePage = () => {
  const [ShowLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector((state) => state.login.userDetail);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [profileForm] = Form.useForm();
  const { passwordForm } = Form.useForm();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { TabPane } = Tabs;
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleOk = () => {
    localStorage.removeItem("user");
    setShowLogoutModal(false);

    dispatch(logout());
  };
  const handleProfileChanges = (values) => {
    const profileChanges = {
      username: values.username,
      email: values.email,
      mobileno: values.mobileno,
      address: values.address,
    };
  };
  const handleChangePassword = (values) => {
    if (loggedInUserInfo.password === values.oldPassword) {
      setShowChangePassword(true);
    } else {
      messageApi.open({
        type: "error",
        key: "msg-key",
        content: <div className="msg-container">password Invalid</div>,
        icon: <></>,
        className: "custom-error-msg",
        style: {
          marginTop: "3vh",
        },
      });
    }
  };

  const handleProfilePage = () => {
    setShowProfileModal(true);
  };

  const handleProfileCancel = () => {
    setShowProfileModal(false);
    passwordForm?.resetFields();
  };

  const validateEmail = (_, value) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Please enter a valid email address");
  };

  const validatePassword = (_, value) => {
    const passwordRegex =
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
    if (!value || value.match(passwordRegex)) {
      return Promise.resolve();
    }
    return Promise.reject("Password must contain at least 8 characters.");
  };

  useEffect(() => {
    if (showProfileModal && profileForm && loggedInUserInfo) {
      profileForm.setFieldsValue({
        username: loggedInUserInfo.username,
        email: loggedInUserInfo.email,
        mobileno: loggedInUserInfo.mobileno,
        address: "chennai",
      });
    }
  }, [showProfileModal, profileForm]);
  return (
    <>
      {contextHolder}
      <div style={{ width: "100px", margin: "20px" }}>
        <p style={{ cursor: "pointer" }} onClick={handleProfilePage}>
          <span style={{ marginRight: "10px" }}>
            <UserOutlined />
          </span>
          My Profile
        </p>
        {loggedInUserInfo && (
          <p
            onClick={handleLogout}
            style={{ cursor: "pointer", marginBottom: "0px" }}
          >
            <span style={{ marginRight: "10px" }}>
              <LogoutOutlined />
            </span>
            Logout
          </p>
        )}
      </div>
      <Modal
        open={ShowLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        closable={false}
        centered
        width={300}
        footer={null}
        maskClosable={false}
        style={{ borderRadius: "15px" }}
      >
        <Result
          icon={<ExclamationCircleOutlined style={{ color: "green" }} />}
          title={
            <>
              <span style={{ fontSize: "15px" }}>
                Hi,{loggedInUserInfo.username}
              </span>
              <br />
              <span style={{ fontSize: "15px" }}>
                Are you sure do you want to logout?
              </span>
            </>
          }
          extra={[
            <>
              <Row justify="end">
                <Space>
                  <Col span={4} offset={18}>
                    <Button
                      style={{ width: "80px" }}
                      onClick={() => setShowLogoutModal(false)}
                    >
                      No
                    </Button>
                  </Col>
                  <Col span={4} offset={22}>
                    <Button
                      className="logoutStyle"
                      onClick={handleOk}
                      loading={logoutLoading}
                    >
                      <span style={{ marginRight: "8px" }}>Yes</span>
                      <span>
                        <ArrowRightOutlined className="logoutArrowStyle" />
                      </span>
                    </Button>
                  </Col>
                </Space>
              </Row>
            </>,
          ]}
        />
      </Modal>
      {showProfileModal && (
        <Modal open onCancel={() => setShowProfileModal(false)} footer={null}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Profile" key="1" icon={<UserOutlined />}>
              <Form
                form={profileForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                autoComplete="off"
                onFinish={handleProfileChanges}
              >
                <Form.Item label="Username" name="username">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: " Please enter valid email",
                    },
                    {
                      validator: validateEmail,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mobile No"
                  name="mobileno"
                  rules={[
                    {
                      required: true,
                      message: "Please enter mobile number",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit mobile number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <TextArea />
                </Form.Item>
                <Row justify="end">
                  <Space>
                    <Col span={4}>
                      <Button
                        className="allButtons"
                        onClick={handleProfileCancel}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col span={4}>
                      <Button
                        type="primary"
                        className="allButtons"
                        htmlType="submit"
                      >
                        Save
                      </Button>
                    </Col>
                  </Space>
                </Row>
              </Form>
            </TabPane>
            <TabPane tab="Change Password" key="2" icon={<UserOutlined />}>
              <Form
                form={passwordForm}
                onFinish={handleChangePassword}
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Form.Item
                  label="Old Password"
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: " Please enter valid password",
                    },

                    { validator: validatePassword },
                  ]}
                >
                  <Input.Password disabled={showChangePassword} />
                </Form.Item>
                {showChangePassword && (
                  <>
                    <Form.Item label="New Password" name="newPassword">
                      <Input.Password />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                      <Input.Password />
                    </Form.Item>
                  </>
                )}
                <Row justify="end">
                  <Space>
                    <Col span={4}>
                      <Button
                        className="allButtons"
                        onClick={handleProfileCancel}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col span={4}>
                      <Button
                        type="primary"
                        className="allButtons"
                        htmlType="submit"
                      >
                        Save
                      </Button>
                    </Col>
                  </Space>
                </Row>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      )}
    </>
  );
};
export default MyProfilePage;
