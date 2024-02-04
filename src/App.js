import { ConfigProvider } from "antd";
import "./App.css";
import LayoutPage from "./components/LayoutPage";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
            borderRadius: 4,
            // colorBgContainer: "#f6ffed",
          },
        }}
      >
        <LayoutPage />
      </ConfigProvider>
    </>
  );
}

export default App;
