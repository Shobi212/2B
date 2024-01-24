import { useState } from "react";
import { COLORS_WITH_EXCODES, WOMENS_DETAILS } from "../common/Constant";
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
import "../design/HomePage.css";
import CheckableTag from "antd/es/tag/CheckableTag";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/LoginSlice";
import axios from "axios";
import LoginComponent from "./LoginComponent";

const WomensCollections = ({ isLogin, setIsLogin }) => {
  const [womensDetails, setWomensDetails] = useState(WOMENS_DETAILS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWomensCollection, setSelectedWomensCollection] =
    useState(null);

  const [visible, setVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { Option } = Select;

  const showModal = (Item) => {
    setSelectedWomensCollection(Item);
    setIsModalOpen(true);
  };
  const womensModalClose = () => {
    setIsModalOpen(false);
  };

  const handleQuantityChanges = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handlePurchase = () => {
    if (isLoggedIn) {
      const purchaseDetails = {
        name: selectedWomensCollection.name,
        type: selectedWomensCollection.type,
        price: selectedWomensCollection.price,
        shop: selectedWomensCollection.shop,
        size: selectedWomensCollection.sizes.map((size) => size.size),
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
          setIsModalOpen(false);
        });
    } else {
      setLoginModal(true);
    }
  };
  return (
    <>
      <Row gutter={[8, 8]} className="imagestyle">
        {womensDetails.map((Item, index) => (
          <Col span={6} key={index} className="cardStyle">
            <Badge.Ribbon
              text={
                Item.deliveryCharge > 10
                  ? `delivery ₹${Item.deliveryCharge}`
                  : "Free delivery"
              }
              color={Item.deliveryCharge > 10 ? "#054e42" : "#05566e"}
            >
              <Card onClick={() => showModal(Item)} className="imagecard">
                <img src={Item.src} width={250} height={250}></img>
                <div>
                  <p className="dressName">{Item.title}</p>
                  <p className="dressType">{Item.type}</p>
                </div>

                <p className="dressPrice">{`₹${Item.price}`}</p>

                <p>{Item.shop}</p>
                <div>
                  <Space>
                    <span>Size:</span>
                    {Item.sizes.map(({ size, value }) => (
                      <span key={size}>{`${size} ,`}</span>
                    ))}
                  </Space>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      <Modal
        title="WOMEN'S KURTIS"
        open={isModalOpen}
        onCancel={womensModalClose}
        footer={null}
        closable={false}
        width={700}
      >
        {selectedWomensCollection && (
          <Row>
            <Col span={12}>
              <Image
                src={selectedWomensCollection.src}
                width={300}
                height={300}
                // preview={{
                //   visible,
                // }}
              ></Image>
            </Col>
            <Col span={12}>
              <Row className="rowpadding">
                <Col span={4}>
                  <span>Type:</span>
                </Col>
                <Col span={18}>
                  <span className="dressType">
                    {selectedWomensCollection.type}
                  </span>
                </Col>
              </Row>

              <Row className="rowpadding">
                {/* <Space> */}
                <Col span={4}>
                  <span>Price:</span>
                </Col>
                <Col span={12}>
                  <span className="dressPrice">
                    {`₹${selectedWomensCollection.price}`}
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
                    defaultValue={selectedWomensCollection.colors[1]}
                    buttonStyle="solid"
                    size="small"
                  >
                    <Row>
                      {selectedWomensCollection.colors.map((color, index) => (
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
                    defaultValue={selectedWomensCollection.sizes[0].size}
                    buttonStyle="solid"
                    size="small"
                  >
                    <Row>
                      {selectedWomensCollection.sizes.map((size, index) => (
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
                <Col span={6}>
                  <span>
                    Total:₹
                    {selectedWomensCollection.price * quantity}
                  </span>
                </Col>
                {/* </Space> */}
              </Row>
              <Row justify="end" style={{ marginTop: "40px" }}>
                <Space>
                  <Col>
                    <Button onClick={womensModalClose} className="allButtons">
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

              <Modal
                open={loginModal}
                onCancel={() => setLoginModal(false)}
                footer={null}
                justify="middle"
                closable={false}
              >
                <Result
                  status="warning"
                  title="Please Login To Continue The Process"
                  extra={
                    <>
                      <Button
                        onClick={() => setLoginModal(false)}
                        className="allButtons"
                      >
                        Back
                      </Button>
                      <LoginComponent setLoginModal={setLoginModal} />
                    </>
                  }
                />
              </Modal>
            </Col>
            {/* </Space> */}
          </Row>
        )}
      </Modal>
    </>
  );
};
export default WomensCollections;
