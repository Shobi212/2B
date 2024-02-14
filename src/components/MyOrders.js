import { Drawer, message, Row, Table, Timeline } from "antd";
import { useEffect, useState } from "react";
import { CloseSquareFilled } from "@ant-design/icons";
import { getMyOrdersCols } from "../common/Helpers";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBase";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [showTrackingDrawer, setShowTrackingDrawer] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const userDetail = useSelector((state) => state.login.userDetail);

  const handleTrackingOrder = (record) => {
    // setSelectedTrackingId(record.trackingId);
    let tmpOrderDetails = [];
    getDocs(collection(db, "order_details"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          tmpOrderDetails.push(doc.data());
        });
        // const orders = tmpOrderDetails.filter(
        //   (stock) => stock.user_id === userDetail.user_id
        // );
        setTrackingDetails(tmpOrderDetails);
        setLoading(false);
        setShowTrackingDrawer(true);
      })
      .catch((error) => {});
    // const details = DETAILS.filter((item) => item.order_id === record.order_id);
    // etTrackingDetails(details);
    // setShowTrackingDrawer(true);
  };

  const closeTrackingDrawer = () => {
    setShowTrackingDrawer(false);
  };

  const getMyOrders = () => {
    const tmpOrdersArray = [];
    setLoading(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {contextHolder}
      <Table
        loading={loading}
        dataSource={myOrders}
        columns={getMyOrdersCols(handleTrackingOrder)}
        title={() => (
          <Row justify="start" style={{ marginTop: "0px 0px 10px 0px" }}>
            <span style={{ color: "black", fontSize: "20px" }}>My Orders</span>
          </Row>
        )}
        pagination={false}
      />

      <Drawer
        open={showTrackingDrawer}
        onClose={closeTrackingDrawer}
        placement="right"
        title="Order Tracking"
        closeIcon={<CloseSquareFilled className="modal_close_icon" />}
      >
        <Timeline>
          {trackingDetails.map((item, index) => (
            <>
              {item.shipmentDetails.map((shipment, index) => (
                <Timeline.Item key={index} color="green">
                  {shipment.shipments.map((step, stepIndex) => (
                    <div key={stepIndex}>
                      <p className="trackOrder">
                        {step.children === "shipped"
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
