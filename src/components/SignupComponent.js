import { Button, Col, Drawer, Form, Input, Row, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const SignupComponent = () => {
  const [form] = Form.useForm();
  const [isSignUp, setIsSignUp] = useState(false);
  const signIn = useSelector((state) => state.login.userDetail);
  const showSignUpPage = () => {
    setIsSignUp(true);
  };
  const drawerClose = () => {
    setIsSignUp(false);
  };
  const handleSignUp = (values) => {
    setIsSignUp(false);
    console.log(values);
    const userData = {
      username: values.username,
      email: values.email,
      mobileno: values.mobileno,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    axios
      .post(
        "https://sampleap3b-default-rtdb.firebaseio.com/users.json",
        userData
      )
      .then((response) => {
        message.success("successfully registered");
      })
      .catch((error) => {
        message.error("user registered failed");
      });
  };
  // const validateMobile = (_, value) => {
  //   const pattern = /^[6-9]\d{9}$/;
  //   if (!pattern.test(value)) {
  //     return Promise.reject("Mobile number must start with 6, 7, 8, or 9");
  //   }
  //   return Promise.resolve();
  // };
  const validatePassword = (_, value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!value || value.match(passwordRegex)) {
      return Promise.resolve();
    }
    return Promise.reject(
      "Password must contain at least 8 characters, including letters and numbers."
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
        <></>
      ) : (
        <Button type="primary" onClick={showSignUpPage} className="allButtons">
          Sign Up
        </Button>
      )}
      <Drawer title="Sign Up" open={isSignUp} onClose={drawerClose} width={500}>
        <Form
          form={form}
          onFinish={handleSignUp}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[
              {
                type: "text",
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

          {/* <Form.Item> */}
          <Row justify="end">
            <Col span={4}>
              <Button htmlType="submit" type="primary" className="allButtons">
                Sign Up
              </Button>
            </Col>
          </Row>
          {/* </Form.Item> */}
        </Form>
      </Drawer>
    </>
  );
};
export default SignupComponent;
