import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Space,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";

const ForgetComponent = ({ setShowForgetPassword }) => {
  const { form } = Form.useForm();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleForgetPassword = (values) => {
    if (values.email) {
      axios
        .get("https://sampleap3b-default-rtdb.firebaseio.com/users.json")
        .then((response) => {
          let userDetailsArray = Object.values(response.data);

          let userDetail = userDetailsArray.find(
            (user) => user.email === values.email
          );
          if (userDetail) {
            setShowPasswordForm(true);
          } else {
            message.error("Email not found. Please enter a valid email.");
          }
        });
    }
    if (values.password) {
      if (values.password !== values.confirmPassword) {
        message.error("password and confirm password doesnot matched");
      } else {
        const userData = {
          password: values.password,
        };
        axios
          .post(
            "https://sampleap3b-default-rtdb.firebaseio.com/users.json",
            userData
          )
          .then((response) => {
            message.success("successfully registered");
            setShowForgetPassword(false);
          })
          .catch((error) => {
            message.error("password not registered");
          });
      }
    }
    //  setIsForgetPassword(false);
  };

  // const handlePasswordModal = (values) => {}
  const closeForgetPassword = () => {
    setShowForgetPassword(false);
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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!value || value.match(passwordRegex)) {
      return Promise.resolve();
    }
    return Promise.reject(
      "Password must contain at least 8 characters, including letters and numbers."
    );
  };
  return (
    <>
      <Drawer
        open={() => setShowForgetPassword(true)}
        title="Forget Password"
        closable={false}
        footer={null}
        width={450}
      >
        <Form
          form={form}
          onFinish={handleForgetPassword}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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
            <Input />
          </Form.Item>
          {showPasswordForm ? (
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
              {/* <Form.Item> */}
              <Row justify="end">
                <Space>
                  <Col>
                    <Button
                      onClick={closeForgetPassword}
                      className="allButtons"
                    >
                      Back
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="allButtons"
                    >
                      Continue
                    </Button>
                  </Col>
                </Space>
              </Row>
              {/* </Form.Item> */}
            </>
          ) : (
            // <Form.Item>
            <Row justify="end">
              <Space>
                <Col>
                  <Button
                    onClick={() => setShowForgetPassword(false)}
                    className="allButtons"
                  >
                    Back
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="allButtons"
                  >
                    Continue
                  </Button>
                </Col>
              </Space>
            </Row>
            // </Form.Item>
          )}
        </Form>
      </Drawer>

      {/* <Modal open={isPasswordModal} closable={false} footer={null}>
        <Form form={form} onFinish={handlePasswordModal}>
          <Form.Item
            label="assword"
            name="password"
            rules={[
              {
                required: true,
                message: "enter your password",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "re-enter your password",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button onClick={closeForgetPassword}>Back</Button>
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};
export default ForgetComponent;
