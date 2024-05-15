import { Col, Layout, Menu, Popover, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "../design/Styles.scss";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import WomensCollections from "./WomensCollections";
import MensCollections from "./MensCollections";
import KidsCollections from "./KidsCollections ";
// import HomePage from "./HomePage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/LoginSlice";
import MyOrders from "./MyOrders";
import Stocks from "./Stocks";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import ForgetComponent from "./ForgetComponent";
import DashBoard from "./DashBoard";
import ContactModal from "./ContactModal";
import LoginAlertModal from "../common/LoginAlertModal";

const LayoutPage = () => {
  // const role = "customer";
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

  const location = useLocation();

  const handlePopoverChange = (newVisible) => {
    setShowContactPopover(newVisible);
  };
  useEffect(() => {
    // const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) {
      dispatch(login(userDetails));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Header className="headerStyle">
          <Row justify="space-between" align="middle">
            <Col span={16}>
              <Menu
                theme="dark"
                mode="horizontal"
                // defaultSelectedKeys={["1"]}
                selectedKeys={[location.pathname]}
              >
                {/* <Menu.Item key="1">
                  <Link to="/HomePage">Home</Link>
                </Menu.Item> */}
                {loggedInUserInfo && true && (
                  <Menu.Item key="/2B/DashBoard">
                    <Link to="/2B/DashBoard">Dash Board</Link>
                  </Menu.Item>
                )}

                <Menu.Item key="/2B/WomensCollections">
                  <Link to="/2B/WomensCollections">Womens Collections</Link>
                </Menu.Item>

                <Menu.Item key="/2B/MensCollections">
                  <Link to="/2B/MensCollections">Mens Collections</Link>
                </Menu.Item>

                <Menu.Item key="/2B/kidsCollections">
                  <Link to="/2B/kidsCollections">Kids Collections</Link>
                </Menu.Item>
                {loggedInUserInfo && true && (
                  <Menu.Item key="/2B/MyOrders">
                    <Link to="/2B/MyOrders">My Orders</Link>
                  </Menu.Item>
                )}
                {loggedInUserInfo && true && (
                  <Menu.Item key="/2B/Stocks">
                    <Link to="/2B/Stocks">Stocks</Link>
                  </Menu.Item>
                )}
              </Menu>
            </Col>
            <Col span={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
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
              </div>
            </Col>
          </Row>
        </Header>
        <Content className="contentStyle" style={{ padding: "12px" }}>
          <Routes>
            {/* <Route path="/HomePage" element={<HomePage />} /> */}
            {/* <Route path="/" element={<WomensCollections />} /> */}
            <Route path="/2B/DashBoard" element={<DashBoard />} />
            <Route
              path="/2B/WomensCollections"
              element={<WomensCollections />}
            />
            <Route path="/2B/MensCollections" element={<MensCollections />} />
            <Route path="/2B/kidsCollections" element={<KidsCollections />} />
            <Route path="/2B/MyOrders" element={<MyOrders />} />
            <Route path="/2B/Stocks" element={<Stocks />} />
            <Route path="*" element={<Navigate to="/2B/WomensCollections" />} />
          </Routes>
        </Content>
        <Footer className="footerStyle">
          <Row justify="space-between">
            <Col span={6}>
              <span style={{ fontWeight: "500" }}>
                Copyright-&copy; 2024 2B
              </span>
            </Col>
            <Col span={4}>
              <span style={{ alignItems: "center", fontWeight: "500" }}>
                Follow :
              </span>
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
                  alt=""
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
                  alt=""
                ></img>
              </Link>

              <span style={{ margin: "15px", fontWeight: "500" }}>
                <Popover
                  title={
                    <div
                      style={{
                        background: "#00b96b",
                        padding: "14px",
                        color: "white",
                      }}
                    >
                      Contact Us
                    </div>
                  }
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
