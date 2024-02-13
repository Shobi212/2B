import { Badge, Card, Col, message, Rate, Row, Space } from "antd";
import { useEffect, useState } from "react";
import CollectionModal from "./CollectionModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase";

const MensCollections = () => {
  const [mensStocks, setMensStocks] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = (Item) => {
    setSelectedStock(Item);
    setShowDetailModal(true);
  };

  const getMensStocks = () => {
    const tmpStocksArray = [];
    getDocs(collection(db, "stocks"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          tmpStocksArray.push(doc.data());
        });
        const activeStocks = tmpStocksArray.filter(
          (stock) => stock.isActive && stock.category === "mens"
        );
        setMensStocks(activeStocks);
      })
      .catch((error) => {
        console.group(error);
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
  };

  useEffect(() => {
    getMensStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {contextHolder}
      <Row gutter={[8, 8]} className="imagestyle">
        {mensStocks.map((item, index) => (
          <Col span={6} key={index}>
            <Badge.Ribbon
              text={
                item.deliveryCharge > 10
                  ? `delivery @ ₹${item.deliveryCharge}`
                  : "Free delivery"
              }
              color={item.deliveryCharge > 10 ? "#faad14" : " #a0d911"}
            >
              <Card
                onClick={() => showModal(item)}
                className="cardStyle"
                style={{ cursor: "pointer" }}
              >
                <img src={item.src} alt="" width={250} height={250}></img>
                <div>
                  <p className="dressType">{item.type}</p>
                </div>
                <p>{`₹${item.price}`}</p>
                <p
                  style={{
                    backgroundColor: "rgb(4, 101, 51)",
                    width: "50px",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <span style={{ color: "white", fontSize: "13px" }}>4.2</span>
                  <span>
                    <Rate
                      allowHalf
                      allowClear={false}
                      disabled
                      count={1}
                      defaultValue={1}
                      style={{ color: "white", fontSize: "11px" }}
                    />
                  </span>
                </p>
                <p style={{ fontWeight: "bold" }}>{item.shop}</p>
                <Space>
                  {Object.entries(item.sizes || {}).map(([size, value]) => (
                    <span key={size}>{`${size} ,`}</span>
                  ))}
                </Space>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      {selectedStock && (
        <CollectionModal
          selectedStock={selectedStock}
          showDetailModal={showDetailModal}
          setShowDetailModal={setShowDetailModal}
        />
      )}
    </>
  );
};
export default MensCollections;
