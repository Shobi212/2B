import { Modal, Result } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/LoginSlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const MyProfilePage = () => {
  const [ShowLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.login.userDetail);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const handleOk = () => {
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    dispatch(logout());
    // form.resetFields();
  };
  return (
    <>
      <div style={{ width: "150px", height: "70px", margin: "20px" }}>
        <p>My Profile</p>
        {signIn && (
          <p onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </p>
        )}
      </div>
      <Modal
        open={ShowLogoutModal}
        onOk={handleOk}
        okText="Yes"
        cancelText="No"
        onCancel={() => setShowLogoutModal(false)}
        closable={false}
        centered
        width={300}
      >
        <Result
          icon={<ExclamationCircleOutlined style={{ color: "green" }} />}
          title={
            <span style={{ fontSize: "15px" }}>
              "Are you sure do you want to logout?"
            </span>
          }
        />
      </Modal>
    </>
  );
};
export default MyProfilePage;
