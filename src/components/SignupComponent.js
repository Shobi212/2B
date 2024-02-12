import { Button, Col, Drawer, Form, Input, Row, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MenuOutlined,
  CloseOutlined,
  CloseSquareFilled,
} from "@ant-design/icons";
import { db } from "../FireBase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const SignupComponent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showSignUpDrawer, setShowSignUpDrawer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loggedInUserInfo = useSelector((state) => state.login.userDetail);

  const showSignUpPage = () => {
    setShowSignUpDrawer(true);
  };

  const drawerClose = () => {
    setShowSignUpDrawer(false);
  };

  const handleSignUp = (values) => {
    setIsSaving(true);
    const allUsers = [];
    const userData = {
      username: values.username,
      email: values.email,
      mobileno: values.mobileno,
      password: values.password,
      role: "customer",
    };

    getDocs(collection(db, "users"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          allUsers.push(doc.data());
        });
        userData.user_id = allUsers.length + 1;
        const userDocPath = `users/${userData.user_id}`;
        setDoc(doc(db, userDocPath), userData)
          .then(() => {
            messageApi.open({
              type: "success",
              key: "msg-key",
              content: (
                <div className="msg-container">
                  Hello {userData.username}, your signup was successful.
                </div>
              ),
              icon: <></>,
              className: "custom-success-msg",
              style: {
                marginTop: "3vh",
              },
            });
            setIsSaving(false);
            setShowSignUpDrawer(false);
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
            setIsSaving(false);
          });
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
        setIsSaving(false);
      });

    // axios
    //   .post(
    //     "https://sampleap3b-default-rtdb.firebaseio.com/allUsers.json",
    //     userData
    //   )
    //   .then((response) => {
    //     message.success("successfully registered");
    //   })
    //   .catch((error) => {
    //     message.error("user registered failed");
    //   });
  };

  const validatePassword = (_, value) => {
    const passwordRegex =
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
    if (!value || value.match(passwordRegex)) {
      return Promise.resolve();
    }
    return Promise.reject("Password must contain at least 8 characters.");
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
      {contextHolder}
      {loggedInUserInfo ? (
        <></>
      ) : (
        <Button type="primary" onClick={showSignUpPage} className="allButtons">
          Sign Up
        </Button>
      )}
      {showSignUpDrawer && (
        <Drawer
          title="Sign Up"
          open
          onClose={drawerClose}
          width={520}
          placement="right"
          closeIcon={<CloseSquareFilled className="modal_close_icon" />}
        >
          <Form
            name="signupForm"
            onFinish={handleSignUp}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 15,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="User Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter username",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
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
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
                { validator: validatePassword },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="ConfirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true },
                { min: 8, message: "Password must be at least 8 characters" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row justify="end">
              <Col span={6}>
                <Button
                  loading={isSaving}
                  htmlType="submit"
                  type="primary"
                  className="allButtons"
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </Drawer>
      )}
    </>
  );
};
export default SignupComponent;
