import { Button, Drawer, Image, message, Table, Tag, Timeline } from "antd";
import { MY_ORDERS, DETAILS } from "../common/OrderDetails";
import { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { getMyOrdersCols } from "../common/Helpers";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [myOrders, setMyOrders] = useState(MY_ORDERS, DETAILS);
  const [showTrackingDrawer, setShowTrackingDrawer] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const userDetail = useSelector((state) => state.login.userDetail);

  const handleTrackingOrder = (record) => {
    // setSelectedTrackingId(record.trackingId);
    const details = DETAILS.filter((item) => item.order_id === record.order_id);
    setTrackingDetails(details);
    setShowTrackingDrawer(true);
  };

  const closeTrackingDrawer = () => {
    setShowTrackingDrawer(false);
  };

  const getMyOrders = () => {
    const tmpOrdersArray = [];
    getDocs(collection(db, "orders"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          tmpOrdersArray.push(doc.data());
        });
        const orders = tmpOrdersArray.filter(
          (stock) => stock.user_id === userDetail.user_id
        );
        setMyOrders(orders);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
    getMyOrders();
  }, []);

  return (
    <>
      {contextHolder}
      <Table
        loading={loading}
        dataSource={myOrders}
        columns={getMyOrdersCols(handleTrackingOrder)}
        title={() => "My Orders"}
        pagination={false}
      />

      <Drawer
        open={showTrackingDrawer}
        onClose={closeTrackingDrawer}
        placement="right"
        title="Order Tracking"
      >
        <Timeline>
          {trackingDetails.map((item, index) => (
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
