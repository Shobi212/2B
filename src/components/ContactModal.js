import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Row,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

const ContactModal = () => {
  const { form } = Form.useForm();
  const [showMsgResponseModal, setShowMsgResponseModal] = useState(false);

  const handleFormSubmit = () => {
    setShowMsgResponseModal(true);
    form.resetFields();
  };
  useEffect(() => {
    // form.setFieldsValue({
    //   name: "priya",
    //   email: "priya@gmail.com",
    //   phoneNo: 8967452345,
    // });
  }, []);
  return (
    <>
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
          name="phoneNo"
          label="Phone No"
          rules={[
            {
              required: true,
              message: "Please Enter phone number",
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
          <Col>
            <Button>Cancel</Button>
          </Col>
          <Col span={6}>
            <Button type="primary" htmlType="submit">
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
        width={250}
        closable={false}
      >
        <h2 style={{ fontFamily: "cursive" }} align="center">
          Thank you
        </h2>
        <p style={{ justifyContent: "center" }}>
          We've received your message someone from our team will contact you
          soon
        </p>
        <Row justify="center">
          <Button
            onClick={() => setShowMsgResponseModal(false)}
            style={{ width: "150px", border: "1px solid grey" }}
          >
            ok,Close
          </Button>
        </Row>
      </Modal>
    </>
  );
};
export default ContactModal;
