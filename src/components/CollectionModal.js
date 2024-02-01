import {
  Button,
  Col,
  Image,
  Modal,
  Radio,
  Result,
  Row,
  Select,
  Space,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoginAlertModal } from "../store/slice/ModalSlice";

const CollectionModal = ({
  showCollectionModal,
  isModalOpen,
  setIsModalOpen,
}) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [quantity, setQuantity] = useState(0);
  const { Option } = Select;
  const dispatch = useDispatch();
  const [showPurchaseSuccessMsg, setShowPurchaseSuccessMsg] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleQuantityChanges = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const womensModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePurchase = () => {
    if (isLoggedIn) {
      const purchaseDetails = {
        name: showCollectionModal.name,
        type: showCollectionModal.type,
        price: showCollectionModal.price,
        shop: showCollectionModal.shop,
        size: showCollectionModal.sizes.map((size) => size.size),
      };
      axios
        .post("https//@2b_boutique.com/purchase.details", purchaseDetails)
        .then((res) => {
          message.error(
            "Failed to complete the purchase. Please try again later"
          );
        })
        .catch((error) => {
          // message.success("successfully purchased");
          messageApi.open({
            type: "success",
            key: "msg-key",
            content: (
              <div className="msg-container">
                Successfully Purchased
                <p>Order ID : 2017182818828182881</p>
              </div>
            ),
            // icon:<CheckOutlined />,
            className: "custom-success-msg",
            style: {
              marginTop: "3vh",
            },
          });
          // setShowPurchaseSuccessMsg(true);
          setIsModalOpen(false);
        });
    } else {
      dispatch(showLoginAlertModal());
    }
  };
  return (
    <>
      <Modal
        title="WOMEN'S KURTIS"
        open={isModalOpen}
        onCancel={womensModalClose}
        footer={null}
        closable={false}
        width={800}
      >
        {showCollectionModal && (
          <Row>
            <Col span={12}>
              <Image
                src={showCollectionModal.src}
                width={300}
                height={300}
              ></Image>
            </Col>
            <Col span={12}>
              <Row className="rowpadding">
                <Col span={4}>
                  <span>Type</span>
                </Col>
                <Col span={2}>
                  <span>:</span>
                </Col>
                <Col span={18}>
                  <span className="dressType">{showCollectionModal.type}</span>
                </Col>
              </Row>
              <Row className="rowpadding">
                {/* <Space> */}
                <Col span={4}>
                  <span>Price</span>
                </Col>
                <Col span={2}>
                  <span>:</span>
                </Col>
                <Col span={18}>
                  <span className="dressPrice">
                    {`₹${showCollectionModal.price}`}
                  </span>
                </Col>
                {/* </Space> */}
              </Row>
              <Row className="rowpadding">
                <Col span={4}>
                  <span>Colors</span>
                </Col>
                <Col span={2}>
                  <span>:</span>
                </Col>
                <Col span={18}>
                  <Radio.Group
                    defaultValue={showCollectionModal.colors[1]}
                    buttonStyle="solid"
                    size="small"
                  >
                    <Row>
                      {showCollectionModal.colors.map((color, index) => (
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
                  <span>Sizes</span>
                </Col>
                <Col span={2}>
                  <span>:</span>
                </Col>
                <Col span={18}>
                  <Radio.Group
                    defaultValue={showCollectionModal.sizes[0].size}
                    buttonStyle="solid"
                    size="small"
                  >
                    <Row>
                      {showCollectionModal.sizes.map((size, index) => (
                        <Radio.Button key={index} value={size.size}>
                          {size.size}
                        </Radio.Button>
                      ))}
                    </Row>
                  </Radio.Group>
                </Col>
              </Row>
              <Row className="rowpadding" justify="start">
                <Col span={4}>
                  {/* <span>Total : ₹{showCollectionModal.price * quantity}</span> */}
                  <span>Total </span>
                </Col>
                <Col span={2}>
                  <span>:</span>
                </Col>
                <Col span={4}>
                  <span>₹{showCollectionModal.price * quantity}</span>
                </Col>
                <Col span={4}>
                  <span>Quantity</span>
                </Col>
                <Col span={2}>
                  <span>:</span>
                </Col>
                <Col span={4}>
                  <Select
                    defaultValue={0}
                    style={{ width: "80px", height: "20px" }}
                    onChange={handleQuantityChanges}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <Option key={num} value={num}>
                        {num}
                      </Option>
                    ))}
                  </Select>
                </Col>
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
            </Col>
            {/* </Space> */}
          </Row>
        )}
      </Modal>
      <div>{contextHolder}</div>
      {/* <Modal
        open={showPurchaseSuccessMsg}
        onCancel={() => setShowPurchaseSuccessMsg(false)}
        style={{ top: 20 }}
        width={200}
        footer={null}
      >
        <Result
          status="success"
          title={<span>Successfully Purchased</span>}
          subTitle={<span>Order number: 2017182818828182881</span>}
        />
      </Modal> */}
    </>
  );
};
export default CollectionModal;
