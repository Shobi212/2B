import { Button, Drawer, Image, Table, Tag, Timeline } from "antd";
import { MY_ORDERS, DETAILS } from "../common/OrderDetails";
import { useState } from "react";
import {
  ClockCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const MyOrders = () => {
  const orderDetailColumns = [
    {
      title: "Item",
      dataIndex: "imageSrc",
      key: "Item",
      align: "center",
      render: (text, record) => (
        <Image
          src={text}
          alt={record.productName}
          style={{ width: "70px", height: "70px" }}
        ></Image>
      ),
    },
    {
      title: "Tracking ID",
      dataIndex: "trackingId",
      key: "Tracking Id",
      align: "center",
    },
    {
      title: "Date Of Purchase",
      dataIndex: "date",
      key: "Date Of Purchase",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "Name",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "Amount",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "Quantity",
      align: "center",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "Color",
      align: "center",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "Size",
      align: "center",
    },
    {
      title: "Status",
      // dataIndex: "status",
      key: "status",
      align: "center",
      render: (record) => (
        <>
          {record.status === "Delivered" ? (
            // <Tag color="#52c41a">
            <span style={{ color: "green" }}>
              <CheckOutlined />
              {record.status}
            </span>
          ) : record.status === "cancelled" ? (
            // <Tag color="#ff4d4f"></Tag>
            <span style={{ color: "red" }}>
              <CloseOutlined />
              {record.status}
            </span>
          ) : (
            // <Tag>
            <span style={{ color: "orange" }}>
              <ClockCircleOutlined
              // style={{ fontSize: "15px", color: "#1890ff" }}
              />
              {record.status}
            </span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "Action",
      align: "center",
      render: (record) => (
        <>
          {record.status === "Delivered" ? (
            <Button
              type="primary"
              // style={{ backgroundColor: "green" }}
              onClick={() => handleTrackingOrder(record)}
            >
              View
            </Button>
          ) : record.status === "ordered" ? (
            <Button type="primary" onClick={() => handleTrackingOrder(record)}>
              View
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleTrackingOrder(record)}>
              View
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
      <Table
        dataSource={orderDetails}
        columns={orderDetailColumns}
        title={() => "My Orders"}
      ></Table>

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
                        <p className="trackOrder">
                          {step.children == "shipped"
                            ? `${step.children} expected by Tue`
                            : step.children}
                        </p>
                        <p>{`${step.label} . ${step.time}`}</p>
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
};
export default MyOrders;
