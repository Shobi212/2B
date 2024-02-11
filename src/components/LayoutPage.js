import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Popover,
  Row,
  Space,
  message,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "../design/Styles.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import WomensCollections from "./WomensCollections";
import MensCollections from "./MensCollections ";
import KidsCollections from "./KidsCollections ";
// import HomePage from "./HomePage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/LoginSlice";
import MyOrders from "./MyOrders";
import Stocks from "./Stocks";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import ForgetComponent from "./ForgetComponent";
import DashBoard from "./DashBoard";
import ContactModal from "./ContactModal";
import LoginAlertModal from "../common/LoginAlertModal";

const LayoutPage = () => {
  const role = "customer";
  const loggedInUserInfo = useSelector((state) => state.login.userDetail);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const [showContactPopover, setShowContactPopover] = useState(false);
  const dispatch = useDispatch();
  const loginAlertModalVisibility = useSelector(
    (state) => state.modal.isLoginAlertVisible
  );

  const twitterURL = "https://twitter.com/your_twitter_handle";
  const instagramURL = "https://www.instagram.com/your_instagram_handle";

  const handlePopoverChange = (newVisible) => {
    setShowContactPopover(newVisible);
  };
  useEffect(() => {
    // const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) {
      dispatch(login(userDetails));
    }
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Header className="headerStyle">
          <Row justify="space-between">
            <Col span={20}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                {/* <Menu.Item key="1">
                  <Link to="/HomePage">Home</Link>
                </Menu.Item> */}
                {loggedInUserInfo && true && (
                  <Menu.Item key="2">
                    <Link to="/DashBoard">Dash Board</Link>
                  </Menu.Item>
                )}
                <Menu.Item key="3">
                  <Link to="/WomensCollections">Womens Collections</Link>
                </Menu.Item>

                <Menu.Item key="4">
                  <Link to="/MensCollections">Mens Collections</Link>
                </Menu.Item>

                <Menu.Item key="5">
                  <Link to="/kidsCollections">Kids Collections</Link>
                </Menu.Item>
                {loggedInUserInfo && true && (
                  <Menu.Item key="6">
                    <Link to="/MyOrders">My Orders</Link>
                  </Menu.Item>
                )}
                {loggedInUserInfo && true && (
                  <Menu.Item key="7">
                    <Link to="/Stocks">Stocks</Link>
                  </Menu.Item>
                )}
              </Menu>
            </Col>
            <Col span={4}>
              <Space>
                <LoginComponent
                  // setShowForgetComponent={setShowForgetComponent}
                  setShowForgetPassword={setShowForgetPassword}
                />
                {showForgetPassword && (
                  <ForgetComponent
                    showForgetPassword={showForgetPassword}
                    setShowForgetPassword={setShowForgetPassword}
                  />
                )}
                <SignupComponent />
              </Space>
            </Col>
          </Row>
        </Header>
        <Content className="contentStyle" style={{ padding: "12px" }}>
          <Routes>
            {/* <Route path="/HomePage" element={<HomePage />} /> */}
            <Route path="/" element={<WomensCollections />} />
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path="/WomensCollections" element={<WomensCollections />} />
            <Route path="/MensCollections" element={<MensCollections />} />
            <Route path="/kidsCollections" element={<KidsCollections />} />
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path="/Stocks" element={<Stocks />} />
          </Routes>
        </Content>
        <Footer className="footerStyle">
          <Row justify="space-between">
            <Col span={6}>
              <span>Copyright-&copy; 2024 2B</span>
            </Col>

            <Col span={6}>
              <span style={{ alignItems: "center" }}>Follow :</span>
              {/* <span> */}
              <Link
                to={twitterURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <img
                  src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                  width={13}
                  height={13}
                ></img>
              </Link>
              {/* </span> */}
              {/* <span> */}
              <Link
                to={instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                  width={13}
                  height={13}
                ></img>
              </Link>

              <span style={{ marginLeft: "60px" }}>
                <Popover
                  className="contactStyle"
                  overlayStyle={{ width: "400px" }}
                  content={
                    <ContactModal
                      showContactPopover={showContactPopover}
                      setShowContactPopover={setShowContactPopover}
                    />
                  }
                  trigger="click"
                  open={showContactPopover}
                  onOpenChange={handlePopoverChange}
                >
                  Contact Us
                </Popover>
              </span>
            </Col>
          </Row>
        </Footer>
      </Layout>
      {loginAlertModalVisibility && <LoginAlertModal />}
    </>
  );
};
export default LayoutPage;
