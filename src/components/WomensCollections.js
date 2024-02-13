import { useEffect, useState } from "react";
import { Badge, Card, Col, message, Rate, Row, Space } from "antd";
// import "../design/HomePage.scss";
import CollectionModal from "./CollectionModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase";
import { WOMENS_CATEGORY } from "../common/Constants";
import Loader from "./Loader";

const WomensCollections = () => {
  const [womensStocks, setWomensStocks] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const showModal = (Item) => {
    setSelectedStock(Item);
    setShowDetailModal(true);
  };

  const getWomensStocks = () => {
    const tmpStocksArray = [];
    setLoading(true);
    getDocs(collection(db, "stocks"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          tmpStocksArray.push(doc.data());
        });
        const activeStocks = tmpStocksArray.filter(
          (stock) => stock.isActive && stock.category === WOMENS_CATEGORY
        );
        setWomensStocks(activeStocks);
        setLoading(false);
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
        setLoading(false);
      });
  };

  useEffect(() => {
    getWomensStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {contextHolder}
      {loading ? (
        <Loader />
      ) : (
        <Row gutter={[8, 8]} className="imagestyle">
          {womensStocks.map((Item, index) => (
            <Col span={6} key={index} className="cardStyle">
              <Badge.Ribbon
                text={
                  Item.deliveryCharge > 10
                    ? `delivery @ ₹${Item.deliveryCharge}`
                    : "Free delivery"
                }
                color={Item.deliveryCharge > 10 ? "#faad14" : " #a0d911"}
              >
                <Card onClick={() => showModal(Item)} className="imagecard">
                  <img src={Item.src} alt="" width={250} height={250}></img>
                  <div>
                    <p className="dressName">{Item.title}</p>
                    <p className="dressType">{Item.type}</p>
                  </div>

                  <p className="dressPrice">{`₹${Item.price}`}</p>
                  <p
                    style={{
                      backgroundColor: "rgb(4, 101, 51)",
                      width: "50px",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "13px" }}>
                      4.2
                    </span>
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
                  <p style={{ fontWeight: "bold" }}>{Item.shop}</p>
                  <div>
                    <Space>
                      <span>Size:</span>
                      {Object.entries(Item.sizes || {}).map(([size, value]) => (
                        <span key={size}>{`${size} ,`}</span>
                      ))}
                    </Space>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      )}
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
export default WomensCollections;
