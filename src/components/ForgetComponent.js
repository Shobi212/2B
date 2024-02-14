import { Button, Col, Drawer, Form, Input, Row, Space, message } from "antd";
// import axios from "axios";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../FireBase";
import { CloseSquareFilled } from "@ant-design/icons";

const ForgetComponent = ({ showForgetPassword, setShowForgetPassword }) => {
  const { form } = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseForgetPassword = () => {
    setShowForgetPassword(false);
  };

  const handleForgetPassword = (values) => {
    if (values.email && !isEmailVerified) {
      setLoading(true);
      const userDetailsArray = [];
      getDocs(collection(db, "users")).then((docSnap) => {
        docSnap.forEach((doc) => {
          userDetailsArray.push(doc.data());
        });

        let userInfo = userDetailsArray.find(
          (user) => user.email === values.email
        );
        if (userInfo) {
          setIsEmailVerified(true);
          setUserInfo(userInfo);
        } else {
          messageApi.open({
            type: "error",
            key: "msg-key",
            content: (
              <div className="msg-container">
                Email not found. Please enter a valid email address.
              </div>
            ),
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
    if (values.password) {
      if (values.password !== values.confirmPassword) {
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
        setLoading(true);
        const userData = {
          ...userInfo,
          password: values.password,
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
            setTimeout(() => {
              setShowForgetPassword(false);
            }, 3000);
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
        // axios
        //   .post(
        //     "https://sampleap3b-default-rtdb.firebaseio.com/users.json",
        //     userData
        //   )
        //   .then((response) => {
        //     message.success("successfully registered");
        //     setShowForgetPassword(false);
        //   })
        //   .catch((error) => {
        //     message.error("password not registered");
        //   });
      }
    }
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
      {showForgetPassword && (
        <Drawer
          open
          title="Forget Password"
          onClose={handleCloseForgetPassword}
          footer={null}
          width={500}
          closeIcon={<CloseSquareFilled className="modal_close_icon" />}
        >
          <Form
            form={form}
            onFinish={handleForgetPassword}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            autoComplete="off"
          >
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
              <Input disabled={isEmailVerified} />
            </Form.Item>
            {isEmailVerified && (
              <>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter password",
                    },
                    {
                      validator: validatePassword,
                    },
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
                      message: " Please re-enter password",
                    },
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
              </>
            )}

            <Row justify="end">
              <Space>
                <Col span={4}>
                  <Button
                    onClick={handleCloseForgetPassword}
                    className="allButtons"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="allButtons"
                  >
                    Continue
                  </Button>
                </Col>
              </Space>
            </Row>
          </Form>
        </Drawer>
      )}
    </>
  );
};
export default ForgetComponent;
