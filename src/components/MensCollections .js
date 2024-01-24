import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  Modal,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Tag,
  message,
} from "antd";
import { MENS_DETAILS } from "../common/MensConstant";
import { useState } from "react";
import CheckableTag from "antd/es/tag/CheckableTag";
import { COLORS_WITH_EXCODES } from "../common/Constant";
import { useSelector } from "react-redux";
import axios from "axios";
import LoginComponent from "./LoginComponent";

const MensCollections = () => {
  const [mensDetails, setMensDetails] = useState(MENS_DETAILS);
  const [visible, setVisible] = useState(false);
  const [selectedMensCollection, setSelectedMensCollection] = useState(null);
  const [modalOpen, isModalOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { Option } = Select;
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const showMensModal = (item) => {
    isModalOpen(true);
    setSelectedMensCollection(item);
  };
  const closeMensModal = () => {
    isModalOpen(false);
  };
  const handleQuantityChanges = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handlePurchase = () => {
    if (isLoggedIn) {
      const purchaseDetails = {
        name: selectedMensCollection.name,
        type: selectedMensCollection.type,
        price: selectedMensCollection.price,
        shop: selectedMensCollection.shop,
        size: selectedMensCollection.sizes.map((size) => size.size),
      };
      axios
        .post("https//@2b_boutique.com/purchase.details", purchaseDetails)
        .then((res) => {
          message.error(
            "Failed to complete the purchase. Please try again later"
          );
        })
        .catch((error) => {
          message.success("successfully purchased");
          isModalOpen(false);
        });
    } else {
      // message.warning("try to login first");
      setLoginModal(true);
    }
  };
  // const resultModal = () => {};
  return (
    <>
      <Row gutter={[8, 8]} className="imagestyle">
        {mensDetails.map((item, index) => (
          <Col span={6} key={index}>
            <Badge.Ribbon
              text={
                item.deliveryCharge > 10
                  ? `delivery ₹${item.deliveryCharge}`
                  : "Free delivery"
              }
              color={item.deliveryCharge > 10 ? "#054e42" : "cyan"}
            >
              <Card onClick={() => showMensModal(item)} className="cardStyle">
                <img src={item.src} width={250} height={250}></img>
                <div>
                  <p className="dressType">{item.type}</p>
                </div>
                <p>{`₹${item.price}`}</p>
                <p>{item.shop}</p>
                <Space>
                  <span>Sizes: </span>
                  {item.sizes.map(({ size, value }) => (
                    <span key={size}>{`${size} ,`}</span>
                  ))}
                </Space>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      <Modal
        title="MENS'S SHIRT"
        open={modalOpen}
        onCancel={closeMensModal}
        width={700}
        footer={null}
        closable={false}
      >
        {selectedMensCollection && (
          <Row>
            <Col span={12}>
              <Image
                src={selectedMensCollection.src}
                width={250}
                height={250}
              ></Image>
            </Col>
            <Col span={12}>
              <Row className="rowpadding">
                {/* <Space> */}
                <Col span={4}>
                  <span>Type:</span>
                </Col>
                <Col span={20}>
                  <span className="dressType">
                    {selectedMensCollection.type}
                  </span>
                </Col>
                {/* </Space> */}
              </Row>
              <Row className="rowpadding">
                {/* <Space> */}
                <Col span={4}>
                  <span>Price:</span>
                </Col>
                <Col span={20}>
                  <span className="dressPrice">
                    {`₹${selectedMensCollection.price}`}
                  </span>
                </Col>
                {/* </Space> */}
              </Row>
              <Row className="rowpadding">
                <Col span={4}>
                  <span>Colors: </span>
                </Col>
                <Col span={20}>
                  <Radio.Group
                    defaultValue={selectedMensCollection.colors[1]}
                    buttonStyle="solid"
                    size="small"
                  >
                    <Row>
                      {selectedMensCollection.colors.map((color, index) => (
                        <Radio.Button key={index} value={color}>
                          {color}
                        </Radio.Button>
                      ))}
                    </Row>
                  </Radio.Group>
                </Col>
              </Row>
              <Row className="rowpadding">
                <Col span={4}>
                  <span>Sizes:</span>
                </Col>
                <Col span={20}>
                  <Radio.Group
                    defaultValue={selectedMensCollection.sizes[0].size}
                    buttonStyle="solid"
                    size="small"
                  >
                    <Row>
                      {selectedMensCollection.sizes.map((size, index) => (
                        <Radio.Button key={index} value={size.size}>
                          {size.size}
                        </Radio.Button>
                      ))}
                    </Row>
                  </Radio.Group>
                </Col>
              </Row>
              <Row className="rowpadding" justify="start">
                {/* <Space> */}
                <Col span={16}>
                  <span>Quantity:</span>
                  {/* </Col>
                <Col span={8}> */}
                  <Select
                    defaultValue={0}
                    style={{ width: 80 }}
                    onChange={handleQuantityChanges}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <Option key={num} value={num}>
                        {num}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={4}>
                  <span>
                    Total:₹
                    {selectedMensCollection.price * quantity}
                  </span>
                </Col>
                {/* </Space> */}
              </Row>
              <Row justify="end" style={{ marginTop: "40px" }}>
                <Space>
                  <Col>
                    <Button onClick={closeMensModal} className="allButtons">
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="allButtons"
                      type="primary"
                      onClick={handlePurchase}
                    >
                      Buy Now
                    </Button>
                  </Col>
                </Space>
              </Row>
            </Col>
          </Row>
        )}
      </Modal>

      <Modal
        open={loginModal}
        onCancel={() => setLoginModal(false)}
        footer={null}
        justify="middle"
        closable={false}
      >
        <Result
          status="warning"
          title="you are continue the process please login first!"
          extra={
            <>
              <LoginComponent />
              <Button
                onClick={() => setLoginModal(false)}
                className="allButtons"
              >
                Back
              </Button>
            </>
          }
        />
      </Modal>
    </>
  );
};
export default MensCollections;
