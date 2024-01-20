import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Image,
  List,
  Row,
  Space,
  Table,
  Timeline,
} from "antd";
import { MY_ORDERS, DETAILS } from "../common/OrderDetails";
import { useState } from "react";
import { COLORS_WITH_EXCODES } from "../common/Constant";
import DashBoard from "./DashBoard";

const MyOrders = () => {
  const orderDetailColumns = [
    {
      title: "Item",
      dataIndex: "imageSrc",
      key: "Item",
      render: (text, record) => (
        <Image
          src={text}
          alt={record.productName}
          style={{ width: "70px", height: "70px" }}
        ></Image>
      ),
    },
    {
      title: "Tracking Id",
      dataIndex: "trackingId",
      key: "Tracking Id",
    },
    {
      title: "Date Of Purchase",
      dataIndex: "date",
      key: "Date Of Purchase",
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "Name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "Amount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "Quantity",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "Color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "Size",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "Action",
      render: (record) => (
        <>
          {record.status === "confirmed" ? (
            <Button
              style={{ backgroundColor: "green" }}
              onClick={() => handleTrackingOrder(record)}
            >
              View
            </Button>
          ) : record.status === "ordered" ? (
            <Button type="primary" onClick={() => handleTrackingOrder(record)}>
              Track
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleTrackingOrder(record)}
              disabled
            >
              Cancelled
            </Button>
          )}
        </>
      ),
    },
  ];
  const [orderDetails, setOrderDetails] = useState(MY_ORDERS, DETAILS);
  const [showTrackingDrawer, setShowTrackingDrawer] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState(null);
  const [trackingDetails, setTrackingDetails] = useState(DETAILS);

  const handleTrackingOrder = (record) => {
    setShowTrackingDrawer(true);
    setSelectedTrackingId(record.trackingId);
  };
  const closeTrackingDrawer = () => {
    setShowTrackingDrawer(false);
  };

  return (
    <>
      <Table dataSource={orderDetails} columns={orderDetailColumns}></Table>

      <Drawer
        open={showTrackingDrawer}
        onClose={closeTrackingDrawer}
        placement="right"
        title="Order Tracking"
      >
        <Timeline>
          {trackingDetails
            .filter((item) => item.trackingId === selectedTrackingId)
            .map((item, index) => (
              // <div key={index}>
              <>
                {item.shipmentDetails.map((shipment, index) => (
                  <Timeline.Item key={index} color="green">
                    {shipment.shipments.map((step, stepIndex) => (
                      <div key={stepIndex}>
                        <p className="trackOrder">{step.children}</p>
                        <p>{`${step.time}:${step.label}`}</p>
                      </div>
                    ))}
                  </Timeline.Item>
                ))}
              </>
              // </div>
            ))}
        </Timeline>
      </Drawer>
    </>
  );
  // const [orderDetail, setOrderDetails] = useState(MY_ORDERS);
  // const [selectedTrackingId, setSelectedTrackingId] = useState(null);
  // const [isModal, setIsModal] = useState(false);
  // const [trackingDetails, setTrackingDetails] = useState(DETAILS);

  // const closeModal = () => {
  //   setIsModal(false);
  // };
  // return (
  //   <>
  //     <Divider orientation="left">Your Orders</Divider>

  //     {orderDetail.map((item, index) => (
  //       <Card key={index} width={500} height={300}>
  //         <Row gutter={[8, 8]}>
  //           <Col span={24}>
  //             <Button type="primary">0115653725005</Button>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={12}>
  //             <img src={item.imageSrc} width={150} height={150}></img>
  //           </Col>
  //           <Col span={12}>
  //             <div>{item.productName}</div>
  //             <div>{item.productStatus}</div>
  //             <div>{item.deliveryDate}</div>
  //             <Button onClick={() => showOrderDetails(item)}>Track</Button>
  //           </Col>
  //         </Row>
  //       </Card>
  //     ))}

  //     {/* <List
  //       // key={index}
  //       // grid={{
  //       //   gutter: 16,
  //       //   column: 4,
  //       // }}
  //       dataSource={orderDetail}
  //       renderItem={(item) => (
  //         <List.Item>
  //           <div style={{ width: "100%" }}>
  //             <Row justify="center">
  //               <Col span={8}>
  //                 <Image src={item.imageSrc} width={150} height={150}></Image>
  //               </Col>
  //               <Col span={8}>
  //                 <div>{item.productName}</div>
  //                 <div> {item.deliveryDate}</div>
  //                 <div>{item.productStatus}</div>
  //               </Col>
  //               <Col span={8}>
  //                 <Button onClick={() => showOrderDetails(item)}>track</Button>
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col>
  //                 <div>{item.orderId}</div>
  //               </Col>
  //             </Row>
  //           </div>
  //         </List.Item>
  //       )}
  //     /> */}

  //     {/* <div>
  //       {MY_ORDERS.map((order) => (
  //         <div
  //           key={order.trackingId}
  //           onClick={() => showOrderDetails(order.trackingId)}
  //         >
  //           <h3>{order.productName}</h3>
  //           <img src={order.imageSrc} alt={order.productName} />
  //         </div>
  //       ))}

  //     <OrderDetailsDrawer
  //         visible={drawerVisible}
  //         onClose={closeDrawer}
  //         trackingId={selectedTrackingId}
  //       />
  //     </div> */}
  //   </>
  // );
};
export default MyOrders;
