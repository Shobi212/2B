import { doc, setDoc } from "@firebase/firestore";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { db } from "../FireBase";
import dayjs from "dayjs";

const ContactModal = ({ setShowContactPopover }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showMsgResponseModal, setShowMsgResponseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    setLoading(true);
    const contactUs = {
      req_id: dayjs().valueOf(),
      name: values.name,
      email: values.email,
      mobileNo: values.mobileNo,
      message: values.message,
    };
    const contactDocPath = `contact_us/${contactUs.req_id}`;
    setDoc(doc(db, contactDocPath), contactUs)
      .then(() => {
        setShowMsgResponseModal(true);
        setShowContactPopover(false);
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
  };
  const closeContactPopover = () => {
    setShowContactPopover(false);
  };
  // useEffect(() => {
  //   if (showContactPopover) {
  //     form?.setFieldsValue({
  //       name: "priya",
  //       email: "priya@gmail.com",
  //       phoneNo: 8967452345,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showContactPopover]);
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please Enter name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please Enter Email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobileNo"
          label="Mobile No"
          rules={[
            {
              required: true,
              message: "Please Enter mobile number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="message"
          label="Message"
          rules={[
            {
              required: true,
              message: "Please Enter message",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Row justify="end">
          <Col span={6}>
            <Button onClick={closeContactPopover}>Cancel</Button>
          </Col>
          <Col span={6}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        open={showMsgResponseModal}
        onCancel={() => setShowMsgResponseModal(false)}
        footer={null}
        style={{ textTransform: "capitalize", height: "500px" }}
        // width={250}
        closable={false}
      >
        <h2 style={{ fontFamily: "cursive" }} align="center">
          Thank you
        </h2>
        <p style={{ justifyContent: "center" }}>
          We've received your message, someone from our team will contact you
          soon
        </p>
        <Row justify="center">
          <Button
            onClick={() => setShowMsgResponseModal(false)}
            type="primary"
            className="allButtons"
          >
            Ok,Close
          </Button>
        </Row>
      </Modal>
    </>
  );
};
export default ContactModal;
