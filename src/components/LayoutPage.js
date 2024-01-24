import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Space,
  message,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "../design/HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import WomensCollections from "./WomensCollections";
import MensCollections from "./MensCollections ";
import KidsCollections from "./KidsCollections ";
import HomePage from "./HomePage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/LoginSlice";
import MyOrders from "./MyOrders";
import Stocks from "./Stocks";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import ForgetComponent from "./ForgetComponent";
import DashBoard from "./DashBoard";

const LayoutPage = () => {
  const role = "customer";
  const signIn = useSelector((state) => state.login.userDetail);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user is logged in on page load
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
                <Menu.Item key="1">
                  <Link to="/HomePage">Home</Link>
                </Menu.Item>
                {signIn && role == "customer" && (
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
                {signIn && role == "customer" && (
                  <Menu.Item key="6">
                    <Link to="/MyOrders">My Orders</Link>
                  </Menu.Item>
                )}
                {signIn && role == "admin" && (
                  <Menu.Item key="6">
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
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path="/WomensCollections" element={<WomensCollections />} />
            <Route path="/MensCollections" element={<MensCollections />} />
            <Route path="/kidsCollections" element={<KidsCollections />} />
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path="/Stocks" element={<Stocks />} />
          </Routes>
        </Content>
        <Footer className="footerStyle"></Footer>
      </Layout>
    </>
  );
};
export default LayoutPage;
