import {
  Button,
  Col,
  Image,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  message,
  Progress,
  Rate,
  Card,
  Descriptions,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../FireBase";
import { showLoginAlertModal } from "../store/slice/ModalSlice";
import ReviewComponent from "./ReviewComponent";
import { CloseSquareFilled } from "@ant-design/icons";

const { Option } = Select;

const CollectionModal = ({
  clearSelectedStock,
  selectedStock,
  showDetailModal,
  setShowDetailModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState(selectedStock.colors[0]);
  const [size, setSize] = useState(
    Object.entries(selectedStock.sizes || {})[0][0]
  );
  const [totalAmount, setTotalAmount] = useState(selectedStock.price);
  const [showPurchaseSuccessMsg, setShowPurchaseSuccessMsg] = useState(false);
  const [purchaseDetail, setPurchaseDetail] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userDetail = useSelector((state) => state.login.userDetail);
  const dispatch = useDispatch();

  const handleQuantityChanges = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalAmount(selectedStock.price * newQuantity);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const womensModalClose = () => {
    clearSelectedStock();
    setShowDetailModal(false);
  };

  const handlePurchase = () => {
    if (isLoggedIn) {
      setLoading(true);
      const purchaseData = {
        order_id: Number(userDetail.user_id + dayjs().valueOf()),
        user_id: userDetail.user_id,
        totalAmount: totalAmount,
        color: color,
        quantity: quantity,
        size: size,
        stock: selectedStock,
        status: "ordered",
        dateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      const ordersPath = `orders/${purchaseData.order_id}`;
      setDoc(doc(db, ordersPath), purchaseData)
        .then(() => {
          setPurchaseDetail(purchaseData);
          setShowPurchaseSuccessMsg(true);
          setShowDetailModal(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
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
        });
    } else {
      dispatch(showLoginAlertModal());
    }
  };
  return (
    <>
      <Modal
        title="WOMEN'S KURTIS"
        open={showDetailModal}
        onCancel={womensModalClose}
        footer={null}
        width={800}
        style={{ top: 15 }}
        bodyStyle={{
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          marginRight: "0px",
        }}
        className="custom_scrollbar"
        maskClosable={false}
        closeIcon={<CloseSquareFilled className="modal_close_icon" />}
      >
        {selectedStock && (
          <>
            <Row>
              <Col span={12}>
                <Image src={selectedStock.src} width={300} height={300}></Image>
              </Col>

              <Col span={11}>
                <Descriptions
                  column={1}
                  bordered
                  labelStyle={{ width: "30%" }}
                  contentStyle={{ width: "70%" }}
                >
                  <Descriptions.Item label="Type">
                    {selectedStock.type}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    ₹{selectedStock.price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Colors">
                    <Radio.Group
                      defaultValue={selectedStock.colors[1]}
                      buttonStyle="solid"
                      size="small"
                      onChange={handleColorChange}
                    >
                      <Row>
                        {selectedStock.colors.map((color, index) => (
                          <Radio.Button key={index} value={color}>
                            {color}
                          </Radio.Button>
                        ))}
                      </Row>
                    </Radio.Group>
                  </Descriptions.Item>
                  <Descriptions.Item label="Sizes">
                    <Radio.Group
                      onChange={handleSizeChange}
                      defaultValue={
                        Object.entries(selectedStock.sizes || {})[0][0]
                      }
                      buttonStyle="solid"
                      size="small"
                    >
                      <Row>
                        {Object.entries(selectedStock.sizes || {}).map(
                          ([size, value], index) => (
                            <Radio.Button key={index} value={size}>
                              {size}
                            </Radio.Button>
                          )
                        )}
                      </Row>
                    </Radio.Group>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total">
                    ₹{totalAmount}
                  </Descriptions.Item>
                  <Descriptions.Item label="Quantity">
                    <Select
                      // dropdownClassName="custom-dropdown"
                      defaultValue={1}
                      style={{ width: "80px", height: "30px" }}
                      onChange={handleQuantityChanges}
                    >
                      {[...Array(10).keys()].map((num) => (
                        <Option key={num} value={num+1}>
                          {num+1}
                        </Option>
                      ))}
                    </Select>
                  </Descriptions.Item>
                </Descriptions>
              </Col>

              {/* </Space> */}
            </Row>
            <Card title="">
              <Row>
                <h2>Product Ratings & Reviews</h2>
              </Row>
              <Row>
                <Col span={12}>
                  <div align="center">
                    <span style={{ color: "green", fontSize: "80px" }}>
                      4.2
                    </span>
                    <span>
                      <Rate
                        defaultValue={1}
                        count={1}
                        style={{ color: "green" }}
                      />
                    </span>
                    <p style={{ marginTop: "0px", color: "grey" }}>
                      150 Ratings,
                      <br />
                      100 Reviews
                    </p>
                  </div>
                </Col>
                <Col span={12}>
                  <span>Excellent</span>
                  <span>
                    <Progress
                      percent={70}
                      size="small"
                      strokeColor="darkGreen"
                    />
                  </span>
                  <span>Very good</span>
                  <span>
                    <Progress percent={55} size="small" strokeColor="#06A759" />
                  </span>
                  <span>Good</span>
                  <span>
                    <Progress percent={40} size="small" strokeColor="#F4B743" />
                  </span>
                  <span>Average</span>
                  <span>
                    <Progress percent={30} size="small" strokeColor="#EC803D" />
                  </span>
                  <span>poor</span>
                  <span>
                    <Progress percent={20} size="small" strokeColor="red" />
                  </span>
                </Col>
              </Row>
            </Card>
            <ReviewComponent reviews={selectedStock.reviews} />
            <Row justify="end" style={{ margin: "40px 15px 0px 0px" }}>
              <Space>
                <Col>
                  <Button onClick={womensModalClose} className="allButtons">
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    loading={loading}
                    className="allButtons"
                    type="primary"
                    onClick={handlePurchase}
                  >
                    Buy Now
                  </Button>
                </Col>
              </Space>
            </Row>
          </>
        )}
      </Modal>
      <div>{contextHolder}</div>
      <Modal
        open={showPurchaseSuccessMsg}
        onCancel={() => setShowPurchaseSuccessMsg(false)}
        style={{ top: 120 }}
        // width={350}
        footer={null}
        closeIcon={<CloseSquareFilled className="modal_close_icon" />}
      >
        {/* <Result
          status="success"
          title={<span>Successfully Purchased</span>}
          subTitle={<span>Order ID: 2017182818828182881</span>}
        /> */}

        {purchaseDetail && (
          <Descriptions
            // title={}"Successful purchase!"
            title={
              <span style={{ color: "#52c41a" }}>Successful purchase!</span>
            }
            column={1}
            bordered
            labelStyle={{ width: "60%" }}
            contentStyle={{ width: "40%" }}
          >
            <Descriptions.Item label="Item">
              {purchaseDetail.stock.name}
            </Descriptions.Item>
            <Descriptions.Item label="Order ID">
              <Typography.Paragraph copyable>
                {purchaseDetail.order_id}
              </Typography.Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Transaction Date">
              {purchaseDetail.dateTime}
            </Descriptions.Item>
            <Descriptions.Item label="Order Total">
              {`₹ ${purchaseDetail.totalAmount}`}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};
export default CollectionModal;
