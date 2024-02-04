import { Badge, Card, Col, Row, Space } from "antd";
import { MENS_DETAILS } from "../common/MensConstant";
import { useState } from "react";
import CollectionModal from "./CollectionModal";

const MensCollections = () => {
  const [mensDetails, setMensDetails] = useState(MENS_DETAILS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(null);

  const showModal = (Item) => {
    setShowCollectionModal(Item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Row gutter={[8, 8]} className="imagestyle">
        {mensDetails.map((item, index) => (
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
export default MensCollections;
