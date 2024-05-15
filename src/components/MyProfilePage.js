import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
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
  LogoutOutlined,
  CloseSquareFilled,
} from "@ant-design/icons";

import TextArea from "antd/es/input/TextArea";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../FireBase";
import { useNavigate } from "react-router-dom";

const MyProfilePage = () => {
  const [ShowLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector((state) => state.login.userDetail);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState(null);
  const [profileForm] = Form.useForm();
  const { passwordForm } = Form.useForm();
  const navigate = useNavigate();

  const { TabPane } = Tabs;

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleOk = () => {
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    // window.location.href = "/WomensCollections";
    dispatch(logout());
    navigate("/2B/WomensCollection");
  };

  const handleProfileChanges = (values) => {
    const profileChangedValue = {
      username: values.username,
      email: values.email,
      mobileno: values.mobileno,
      address: values.address,
    };

    const userDetailsArray = [];

    getDocs(collection(db, "users")).then((docSnap) => {
      docSnap.forEach((doc) => {
        userDetailsArray.push(doc.data());
      });

      const userDetail = userDetailsArray.filter(
        (user) => user.email === values.email
      );
      setUserInfo(userDetail);

      const userData = {
        ...userDetail,
        profileChangedValue,
      };

      const userDocPath = `users/${userData.user_id}`;
      setDoc(doc(db, userDocPath), userData)
        .then(() => {
          messageApi.open({
            type: "success",
            key: "msg-key",
            content: (
              <div className="msg-container">
                Your profile successfully changed
              </div>
            ),
            icon: <></>,
            className: "custom-success-msg",
            style: {
              marginTop: "3vh",
            },
          });
          setLoading(false);
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
          setLoading(false);
        });
    });
  };

  // const handleProfileChanges = (values) => {
  //   const profileChangedValue = {
  //     username: values.username,
  //     email: values.email,
  //     mobileno: values.mobileno,
  //     address: values.address,
  //   };
  //   const userDetailsArray = [];
  //   getDocs(collection(db, "users")).then((docSnap) => {
  //     docSnap.forEach((doc) => {
  //       userDetailsArray.push(doc.data());
  //     });

  //     const updatedUserDetailsArray = userDetailsArray.map((user) => {
  //       if (user.email === values.email) {
  //         return {
  //           ...user,
  //           ...profileChangedValue,
  //         };
  //       }
  //       return user;
  //     });

  //     setUserInfo(updatedUserDetailsArray);
  //   });
  //   const userData = {
  //     ...userInfo,
  //     profileChangedValue,
  //   };

  //   const userDocPath = `users/${userData.user_id}`;
  //   setDoc(doc(db, userDocPath), userData)
  //     .then(() => {
  //       messageApi.open({
  //         type: "success",
  //         key: "msg-key",
  //         content: (
  //           <div className="msg-container">
  //             your profile successfully changed
  //           </div>
  //         ),
  //         icon: <></>,
  //         className: "custom-success-msg",
  //         style: {
  //           marginTop: "3vh",
  //         },
  //       });
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       messageApi.open({
  //         type: "error",
  //         key: "msg-key",
  //         content: <div className="msg-container">Something went wrong</div>,
  //         icon: <></>,
  //         className: "custom-error-msg",
  //         style: {
  //           marginTop: "3vh",
  //         },
  //       });
  //       setLoading(false);
  //     });
  // };
  const handleChangePassword = (values) => {
    if (values.oldPassword && !isOldPasswordVerified) {
      setLoading(true);
      const userDetailsArray = [];
      getDocs(collection(db, "users")).then((docSnap) => {
        docSnap.forEach((doc) => {
          userDetailsArray.push(doc.data());
        });

        let userInfo = userDetailsArray.find(
          (user) => user.password === values.oldPassword
        );
        if (userInfo) {
          setIsOldPasswordVerified(true);
          setUserInfo(userInfo);
        } else {
          messageApi.open({
            type: "error",
            key: "msg-key",
            content: <div className="msg-container">Invalid password.</div>,
            icon: <></>,
            className: "custom-error-msg",
            style: {
              marginTop: "3vh",
            },
          });
        }
        setLoading(false);
      });
    }
    if (values.newPassword) {
      if (values.newPassword !== values.confirmPassword) {
        messageApi.open({
          type: "error",
          key: "msg-key",
          content: (
            <div className="msg-container">
              Password and confirm password do not match
            </div>
          ),
          icon: <></>,
          className: "custom-error-msg",
          style: {
            marginTop: "3vh",
          },
        });
        setLoading(false);
      } else {
        const userData = {
          ...userInfo,
          password: values.newPassword,
        };

        const userDocPath = `users/${userData.user_id}`;
        setDoc(doc(db, userDocPath), userData)
          .then(() => {
            messageApi.open({
              type: "success",
              key: "msg-key",
              content: (
                <div className="msg-container">
                  Your password has been successfully changed
                </div>
              ),
              icon: <></>,
              className: "custom-success-msg",
              style: {
                marginTop: "3vh",
              },
            });
            setLoading(false);
            // setTimeout(() => {
            //   (false);
            // }, 3000);
          })
          .catch((error) => {
            messageApi.open({
              type: "error",
              key: "msg-key",
              content: (
                <div className="msg-container">Something went wrong</div>
              ),
              icon: <></>,
              className: "custom-error-msg",
              style: {
                marginTop: "3vh",
              },
            });
            setLoading(false);
          });
      }
    }
    // if (loggedInUserInfo.password === values.oldPassword) {
    //   setIsOldPasswordVerified(true);
    // } else {
    //   messageApi.open({
    //     type: "error",
    //     key: "msg-key",
    //     content: <div className="msg-container">password Invalid</div>,
    //     icon: <></>,
    //     className: "custom-error-msg",
    //     style: {
    //       marginTop: "3vh",
    //     },
    //   });
    // }
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
        // address: "",
      });
    }
  }, [showProfileModal, profileForm, loggedInUserInfo]);
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
            {/* <Link to="/WomensCollections">Logout</Link> */}
            Logout
          </p>
        )}
      </div>
      <Modal
        open={ShowLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        closable={false}
        centered
        width={360}
        footer={null}
        maskClosable={false}
        // style={{ borderRadius: "15px" }}
      >
        <Result
          status="warning"
          icon={
            <ExclamationCircleOutlined
            // style={{ color: "green" }}
            />
          }
          title={
            <>
              <span style={{ fontSize: "15px" }}>
                Hi, {loggedInUserInfo.username}
              </span>
              <br />
              <span style={{ fontSize: "15px" }}>
                Are you sure do you want to logout?
              </span>
            </>
          }
          extra={[
            <>
              <Row justify="center" style={{ paddingTop: "20px" }}>
                <Space>
                  <Col span={4}>
                    <Button
                      style={{ width: "80px" }}
                      onClick={() => setShowLogoutModal(false)}
                    >
                      No
                    </Button>
                  </Col>
                  <Col span={4}>
                    <Button
                      className="logoutStyle"
                      onClick={handleOk}
                      // loading={logoutLoading}
                    >
                      <span>Yes</span>
                    </Button>
                  </Col>
                </Space>
              </Row>
            </>,
          ]}
        />
      </Modal>
      {showProfileModal && (
        <Modal
          open
          onCancel={() => setShowProfileModal(false)}
          footer={null}
          closeIcon={<CloseSquareFilled className="modal_close_icon" />}
        >
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
                      message: " Please enter password",
                    },

                    // { validator: validatePassword },
                  ]}
                >
                  <Input.Password disabled={isOldPasswordVerified} />
                </Form.Item>
                {isOldPasswordVerified && (
                  <>
                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: " Please enter password",
                        },

                        { validator: validatePassword },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: " Please enter confirm password",
                        },
                      ]}
                    >
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
                        loading={loading}
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
