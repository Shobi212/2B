// import { Bar } from "@ant-design/charts";
import { Bar, Column } from "@ant-design/charts";
import BarChart from "@ant-design/charts/es/bar";
import PieChart from "@ant-design/charts/es/pie";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
import "../design/HomePage.css";
import { useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import LineChart from "@ant-design/charts/es/line";

const DashBoard = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date, dateString);
    console.log(dateString);
  };
  const mensData = [
    { type: "Casual-shirt", value: 35 },
    { type: "t-shirt", value: 25 },
    { type: "jeans", value: 20 },
    { type: "formal-shirt", value: 20 },
    { type: "slimfit", value: 20 },
  ];

  const womensData = [
    { type: "Umberella-chudithar", value: 25 },
    { type: "Embroid Design Kurtis", value: 35 },
    { type: "Rounded Bottom Design", value: 25 },
    { type: "Cotton Frog Modal", value: 10 },
    { type: "Women Straight Kurti", value: 15 },
  ];
  const kidsData = [
    { type: "Jeans", value: 30 },
    { type: "shirt and Pants", value: 20 },
    { type: "T-Shirt and Trouser", value: 25 },
    { type: "Frog", value: 10 },
    { type: "Top and Bottom sets ", value: 15 },
  ];
  const interestedProcess = [
    { type: "Embroid Design Kurtis", value: 70 },
    { type: "Casual-Shirt", value: 50 },
    { type: "T-shirt", value: 90 },
    { type: "Umberella-Chudithar", value: 60 },
    { type: "jeans", value: 45 },
  ];
  const mensConfigure = {
    data: mensData,
    angleField: "value",
    colorField: "type",
    radius: 0.6,
    label: false,
    // label: {
    //   type: "outer",
    //   content: "{name} {percentage}",
    //   style: { fill: "black" },
    // },
    // interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };
  const womensConfigure = {
    data: womensData,
    angleField: "value",
    colorField: "type",
    radius: 0.6,
    label: false,
    color: ["#fb5858", "#fb9f9f", "#588061", "#00433f", "#ac573d"],
    // label: {
    //   type: "outer",
    //   content: "{name} {percentage}",
    //   style: { fill: "black" },
    // },
    // interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };
  const kidsConfigure = {
    data: kidsData,
    angleField: "value",
    colorField: "type",
    radius: 0.6,
    label: false,
    color: ["#ff7f50", "#87cefa","#da70d6", "#6495ed", "#ff69b4"],

    // label: {
    //   type: "outer",
    //   content: "{name} {percentage}",
    //   style: { fill: "black" },
    // },
    // interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };
  const interestedConfigure = {
    data: interestedProcess,
    xField: "type",
    yField: "value",
    seriesField: "type",
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 0.8,
        width: "500px",
      },
    },
    legend: { position: "top-left" },
  };

  const data = [
    { month: "Jan", name: "a", gdp: 3 },
    { month: "Feb", name: "a", gdp: 4 },
    { month: "Mar", name: "a", gdp: 2 },
    { month: "Apr", name: "a", gdp: 6 },
    { month: "May", name: "a", gdp: 3 },
    { month: "Jun", name: "a", gdp: 8 },
    //
    { month: "Jul", name: "b", gdp: 2 },
    { month: "Aug", name: "b", gdp: 5 },
    { month: "Sep", name: "b", gdp: 3 },
    { month: "Oct", name: "b", gdp: 7 },
    { month: "Nov", name: "b", gdp: 4 },
    { month: "Dec", name: "b", gdp: 10 },
  ];
  const config = {
    data,
    xField: "month",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => `${v} B`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <>
      <Row justify="end">
        <Col span={4}>
          {/* <Card title="Filter By Date" className="dateCard"> */}
          <div style={{ height: "100px" }}>
            <DatePicker
              onChange={handleDateChange}
              picker="month"
              format="MMM/YYYY"
              placeholder="Filter by date"
            />
          </div>
          {/* </Card> */}
        </Col>
      </Row>
      <Row justify="space-evenly" gutter={[8, 8]}>
        <Col span={6}>
          <Card className="currentStock" title="Stocks">
            {/* <p>Current Stock :150</p> */}
            <Row>
              <Col>Overall Stocks :150</Col>
            </Row>

            {selectedDate && (
              <Row>{selectedDate.format("MMM")} Month Stock:120</Row>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card className="febStock" title="Feb Stocks">
            {/* <Row justify="center">
              <Col span={24}>Stocks</Col>
            </Row> */}
            <Row>
              <Col span={12}>
                <Row>Intake :</Row>
                <Row>Sold Out :</Row>
              </Col>
              <Col span={12}>
                <Row>100</Row>
                <Row>50</Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="revenue" title="Revenue">
            {/* <Row justify="center">
              <Col span={24}>Revenue</Col>
            </Row> */}
            <Row>
              <Col span={12}>
                <Row>Spent :</Row>
                <Row>Sold Out:</Row>
              </Col>
              <Col span={12}>
                <Row>100</Row>
                <Row>50</Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="clothItems" title="Overall Sales">
            <Row>
              <Col span={12}>
                <Row>Womens :</Row>
                <Row>Mens :</Row>
                <Row>Kids :</Row>
              </Col>
              <Col span={12}>
                <Row>50%</Row>
                <Row>65%</Row>
                <Row>30%</Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Card title="Mens Data">
            <PieChart
              {...mensConfigure}
              style={{ width: "100%", height: "300px" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Womens Data">
            <PieChart
              {...womensConfigure}
              style={{ width: "100%", height: "300px" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Kids Data">
            <PieChart
              {...kidsConfigure}
              style={{ width: "100%", height: "300px" }}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card>
            <Column
              {...interestedConfigure}
              style={{ width: "100%", height: "300px" }}
            />
            <p>Interested Process</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <LineChart {...config} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default DashBoard;
