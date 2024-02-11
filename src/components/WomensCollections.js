import { useState } from "react";
import { WOMENS_DETAILS } from "../common/Constant";
import { Badge, Card, Col, Rate, Row, Space } from "antd";
// import "../design/HomePage.scss";
import CollectionModal from "./CollectionModal";

const WomensCollections = () => {
  const [womensDetails, setWomensDetails] = useState(WOMENS_DETAILS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(null);

  const showModal = (Item) => {
    setShowCollectionModal(Item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Row gutter={[8, 8]} className="imagestyle">
        {womensDetails.map((Item, index) => (
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
                <img src={Item.src} width={250} height={250}></img>
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
                  <span style={{ color: "white", fontSize: "13px" }}>4.2</span>
                  <span>
                    <Rate
                      allowHalf
                      count={1}
                      style={{
                        color: "white",
                        fontSize: "16px",
                        backgroundColor: "rgb(4, 101, 51)",
                      }}
                    />
                  </span>
                </p>
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
      {showCollectionModal && (
        <CollectionModal
          showCollectionModal={showCollectionModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
export default WomensCollections;
