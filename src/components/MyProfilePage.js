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

  const { TabPane } = Tabs;
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleOk = () => {
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    dispatch(logout());
    // form.resetFields();
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
      >
        <Result
          icon={
            <ExclamationCircleOutlined
              style={{ color: "green", fontSize: "40px" }}
            />
          }
          title={
            <span style={{ fontSize: "15px" }}>
              Are you sure do you want to logout?
            </span>
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
                  <Col span={4} offset={20}>
                    <Button className="logoutStyle" onClick={handleOk}>
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
                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>
                <Form.Item label="Mobile No" name="mobileno">
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
                <Form.Item label="Old Password" name="oldPassword">
                  <Input />
                </Form.Item>
                {showChangePassword && (
                  <>
                    <Form.Item label="New Password" name="newPassword">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                      <Input />
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
