import { Button, Modal, Result } from "antd";
import { hideLoginAlertModal, showLoginModal } from "../store/slice/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginAlertModal = () => {
  const loginAlertModalVisibility = useSelector(
    (state) => state.modal.isLoginAlertVisible
  );
  const dispatch = useDispatch();

  const handleCloseLoginAlertModal = () => {
    dispatch(hideLoginAlertModal());
  };

  const handleShowLoginModal = () => {
    dispatch(showLoginModal());
    dispatch(hideLoginAlertModal());
  };
  return (
    <>
      <Modal
        open={loginAlertModalVisibility}
        onCancel={handleCloseLoginAlertModal}
        footer={null}
        justify="middle"
        closable={false}
      >
        <Result
          status="warning"
          title="you are continue the process please login first!"
          extra={
            <>
              <Button
                onClick={handleCloseLoginAlertModal}
                className="allButtons"
              >
                Back
              </Button>
              <Button
                onClick={handleShowLoginModal}
                className="allButtons"
                type="primary"
              >
                Login
              </Button>
            </>
          }
        />
      </Modal>
    </>
  );
};
export default LoginAlertModal;
