import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DashboardLoader = () => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 18,
            color: "white",
          }}
          spin
        />
      }
    />
  );
};

export default DashboardLoader;