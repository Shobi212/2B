// import { Bar } from "@ant-design/charts";
import { DualAxes, G2, Line } from "@ant-design/charts";
import PieChart from "@ant-design/charts/es/pie";
import { Card, Col, DatePicker, message, Row } from "antd";
import { useEffect, useState } from "react";
import { db } from "../FireBase";
import { collection, getDocs } from "firebase/firestore";
import dayjs from "dayjs";
// import { G2 } from "@ant-design/plots";

const getStocksReport = (allStocks, allOrders, targetYear, targetMonth) => {
  console.log("Orders Array");
  console.log(allOrders);
  const stocksIntakeReport = allStocks.reduce(
    (accumulator, stock) => {
      const stockYear = dayjs(stock.dateTime).year();
      const stockMonth = dayjs(stock.dateTime).month() + 1;

      if (stockYear === targetYear) {
        accumulator.yearlyStocksIntake += stock.quantity;
        accumulator.yearlyStocksIntakeCost += stock.totalCost;
      }

      if (stockYear === targetYear && stockMonth === targetMonth) {
        accumulator.monthlyStocksIntake += stock.quantity;
        accumulator.monthlyStocksIntakeCost += stock.totalCost;
      }

      return accumulator;
    },
    {
      yearlyStocksIntake: 0,
      yearlyStocksIntakeCost: 0,
      monthlyStocksIntake: 0,
      monthlyStocksIntakeCost: 0,
    }
  );

  const stocksSoldOutReport = allOrders.reduce(
    (accumulator, order) => {
      const orderYear = dayjs(order.dateTime).year();
      const orderMonth = dayjs(order.dateTime).month() + 1;

      if (orderYear === targetYear) {
        accumulator.yearlyStocksSoldOut += order.quantity;
        accumulator.yearlyStocksSoldOutCost += order.totalAmount;
      }

      if (orderYear === targetYear && orderMonth === targetMonth) {
        accumulator.monthlyStocksSoldout += order.quantity;
        accumulator.monthlyStocksSoldoutCost += order.totalAmount;
      }

      return accumulator;
    },
    {
      yearlyStocksSoldOut: 0,
      monthlyStocksSoldout: 0,
      yearlyStocksSoldOutCost: 0,
      monthlyStocksSoldoutCost: 0,
    }
  );

  const stocksSales = allOrders.map((item) => {
    return {
      category: item.stock.category,
      type: item.stock.type,
      quantity: item.quantity,
    };
  });

  const result = {};
  const categories = ["mens", "womens", "kids"];

  for (const category of categories) {
    const filteredData = Object.entries(
      stocksSales
        .filter((item) => item.category === category)
        .reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + item.quantity;
          return acc;
        }, {})
    ).map(([key, value]) => {
      return {
        type: key,
        value: value,
      };
    });

    result[category] = filteredData;
  }

  // const result = filteredData.reduce((acc, item) => {
  //   acc[item.class] = (acc[item.class] || 0) + item.count;
  //   return acc;
  // }, {});

  console.log("Stocks Sales");
  console.log(stocksSales);

  const currentDate = dayjs();
  const tmpArr = Object.entries(
    allOrders
      .filter((item) => {
        const diffInMonths = currentDate.diff(item.dateTime, "month");
        return diffInMonths < 2;
      })
      .reduce((acc, item) => {
        acc[item.stock.type] = (acc[item.stock.type] || 0) + item.quantity;
        return acc;
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  console.log("Temp Array");
  console.log(tmpArr.map(([key, value]) => value));

  let maxValue = Math.max(...tmpArr.map(([key, value]) => value));
  console.log("Max Value");
  console.log(maxValue);

  const pastTwoMonthsData = tmpArr.map(([key, value]) => {
    return {
      category: key,
      value: value,
      type: "Soldout",
      percentage: (value / maxValue) * 100,
    };
  });

  console.log("Past Two Months Data");
  console.log(pastTwoMonthsData);

  // const pastTwonMonthsStocks = pastTwoMonthsData.filter()
  const totalStocks = {};
  for (const item of pastTwoMonthsData) {
    totalStocks[item.category] = allStocks.find(
      (stock) => stock.type === item.category
    )?.quantity;
  }

  const availableStocks = Object.entries(totalStocks).map(([key, value]) => {
    return {
      category: key,
      value: value,
      type: "Available",
    };
  });

  // result.availableStocks = availableStocks;
  // result.pastTwoMonthsData = pastTwoMonthsData;

  const combinedStocks = [...availableStocks, ...pastTwoMonthsData];
  const transformData = pastTwoMonthsData.map((item) => {
    return {
      category: item.category,
      percentage: item.percentage,
    };
  });

  result.combinedStocks = combinedStocks;
  result.transformData = transformData;

  console.log("Transformd Data");
  console.log(transformData);

  const pastSixMonthsData = Object.entries(
    allOrders
      .filter((item) => {
        const diffInMonths = currentDate.diff(item.dateTime, "month");

        return diffInMonths < 6;
      })
      .reduce((acc, item) => {
        let monthName = dayjs(item.dateTime).format("MMM");
        acc[monthName] = (acc[monthName] || 0) + item.quantity;
        return acc;
      }, {})
  ).map(([key, value]) => {
    return {
      Date: key,
      scales: value,
    };
  });

  result.pastSixMonthsData = pastSixMonthsData;
  console.log("Past Six Months Data");
  console.log(pastSixMonthsData);

  console.log("Total Stocks Trending");
  console.log(combinedStocks);

  // const values = [110, 65, 80];

  // // Step 1: Find the highest value
  // const maxValue = Math.max(...values);

  // // Step 2: Calculate the percentage of each value relative to the highest value
  // const percentages = values.map((value) => (value / maxValue) * 100);

  // console.log("Percentage values:", percentages);

  let tmpData = { ...stocksIntakeReport, ...stocksSoldOutReport, ...result };
  console.log("Temp Data");
  console.log(tmpData);
  return tmpData;
};

const DashBoard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [statsData, setStatsData] = useState({
    yearlyStocksIntake: 0,
    yearlyStocksIntakeCost: 0,
    monthlyStocksIntake: 0,
    monthlyStocksIntakeCost: 0,
    yearlyStocksSoldOut: 0,
    yearlyStocksSoldOutCost: 0,
    monthlyStocksSoldout: 0,
    monthlyStocksSoldoutCost: 0,
    combinedStocks: [],
    transformData: [],
    pastSixMonthsData: [],
    // availableStocks: [],
    // pastTwoMonthsData: [],
    trendingStocksReport: [],
    growthReport: [],
  });

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date, dateString);
    console.log(selectedDate);
  };

  const mensConfigure = {
    // data: mensData,
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
    // data: womensData,
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
    // data: kidsData,
    angleField: "value",
    colorField: "type",
    radius: 0.6,
    label: false,
    color: ["#ff7f50", "#87cefa", "#da70d6", "#6495ed", "#ff69b4"],

    // label: {
    //   type: "outer",
    //   content: "{name} {percentage}",
    //   style: { fill: "black" },
    // },
    // interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  const prePareStatsData = () => {
    const stocksArray = [];
    const ordersArray = [];

    getDocs(collection(db, "stocks"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          stocksArray.push(doc.data());
        });

        getDocs(collection(db, "orders"))
          .then((docSnap) => {
            docSnap.forEach((doc) => {
              ordersArray.push(doc.data());
            });
            console.log("All Stoks Array");
            console.log(stocksArray);
            console.log("All Orders Array");
            console.log(ordersArray);
            const statsData = getStocksReport(
              stocksArray,
              ordersArray,
              dayjs().year(),
              dayjs().month() + 1
            );
            setStatsData(statsData);
          })
          .catch((error) => {
            console.log(error);
            message.error("Something went wrong");
          });
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      });
  };

  const { registerTheme } = G2;
  registerTheme("custom-theme", {
    colors10: [
      "#FACDAA",
      "#F4A49E",
      "#EE7B91",
      "#E85285",
      "#BE408C",
      "#BE408C",
    ],

    /** 20色板 */
    colors20: [
      "#FACDAA",
      "#F4A49E",
      "#EE7B91",
      "#E85285",
      "#BE408C",
      "#BE408C",
      "#942D93",
    ],
  });

  const dualconfig = {
    // data: [uvBillData, transformData],
    data: [statsData.combinedStocks, statsData.transformData],
    xField: "category",
    yField: ["value", "percentage"],
    geometryOptions: [
      {
        geometry: "column",
        isStack: true,
        seriesField: "type",
        columnWidthRatio: 0.4,
        label: {},
      },
      {
        geometry: "line",
      },
    ],
    legend: {
      marker: {
        symbol: "circle",
        style: {
          lineWidth: 2,
          r: 6,
          stroke: "#5AD8A6",
          fill: "#fff",
        },
      },
      layout: "vertical",
      position: "right",
      itemName: {
        formatter: (val) => `${val}`,
        style: {
          fill: "#333",
        },
      },
    },
    interactions: [
      {
        type: "element-highlight",
      },
      {
        type: "active-region",
      },
    ],
    animation: false,
    theme: "custom-theme",
  };

  const lineconfig = {
    // data: lineData,
    data: statsData.pastSixMonthsData,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    annotations: [
      {
        type: "regionFilter",
        start: ["min", "median"],
        end: ["max", "0"],
        color: "#F4664A",
      },
      {
        type: "text",
        position: ["min", "median"],
        content: "Revenue",
        offsetY: -4,
        style: {
          textBaseline: "bottom",
        },
      },
      {
        type: "line",
        start: ["min", "median"],
        end: ["max", "median"],
        style: {
          stroke: "#F4664A",
          lineDash: [2, 2],
        },
      },
    ],
  };

  useEffect(() => {
    prePareStatsData();
  }, []);

  return (
    <>
      <Row justify="end" style={{ height: "50px" }}>
        <Col>
          {/* <Card title="Filter By Date" className="dateCard"> */}
          <div>
            <DatePicker
              onChange={handleDateChange}
              picker="month"
              format="MMM/YYYY"
              placeholder="Filter by month"
            />
          </div>
          {/* </Card> */}
        </Col>
      </Row>
      <Row justify="space-between" gutter={[8]} style={{ marginBottom: "8px" }}>
        <Col span={12}>
          <Card title="Yearly Reports">
            <Row justify="space-between" gutter={[8]}>
              <Col span={12}>
                <Card
                  className="currentStock"
                  title={<span style={{ color: "white" }}>Stocks</span>}
                >
                  <Row>
                    <Col span={16}>
                      <Row>Yearly Stocks Intake</Row>
                      <Row>Yearly Stocks Sold out</Row>
                    </Col>
                    <Col span={2}>
                      <Row>:</Row>
                      <Row>:</Row>
                    </Col>
                    <Col span={6}>
                      <Row>{statsData.yearlyStocksIntake}</Row>
                      <Row>{statsData.yearlyStocksSoldOut}</Row>
                    </Col>
                  </Row>
                  {/* {selectedDate && (
                <Row>{selectedDate.format("YYYY")} Anual Stock:8000</Row>
              )} */}
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  className="febStock"
                  title={<span style={{ color: "white" }}>Revenue</span>}
                >
                  <Row>
                    <Col span={16}>
                      <Row>Yearly Intake Cost</Row>
                      <Row>Yearly SoldOut Cost</Row>
                    </Col>
                    <Col span={2}>
                      <Row>:</Row>
                      <Row>:</Row>
                    </Col>
                    <Col span={6}>
                      <Row>{`₹${statsData.yearlyStocksIntakeCost}`}</Row>
                      <Row>{`₹${statsData.yearlyStocksSoldOutCost}`}</Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Monthly Reports">
            <Row justify="space-between" gutter={[8]}>
              <Col span={12}>
                <Card
                  className="revenue"
                  title={<span style={{ color: "white" }}>Stocks</span>}
                >
                  <Row>
                    <Col span={16}>
                      <Row>Monthly Stoks Intake</Row>
                      <Row>Monthly Stocks Sold out</Row>
                    </Col>
                    <Col span={2}>
                      <Row>:</Row>
                      <Row>:</Row>
                    </Col>
                    <Col span={6}>
                      <Row>{statsData.monthlyStocksIntake}</Row>
                      <Row>{statsData.monthlyStocksSoldout}</Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  className="clothItems"
                  title={<span style={{ color: "white" }}>Revenue</span>}
                >
                  <Row>
                    <Col span={16}>
                      <Row>Monthly Intake Cost</Row>
                      <Row>Monthly SoldOut Cost</Row>
                    </Col>
                    <Col span={2}>
                      <Row>:</Row>
                      <Row>:</Row>
                    </Col>
                    <Col span={6}>
                      <Row>{`₹${statsData.monthlyStocksIntakeCost}`}</Row>
                      <Row>{`₹${statsData.monthlyStocksSoldoutCost}`}</Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[8, 8]} style={{ marginBottom: "8px" }}>
        <Col span={8}>
          <Card title="Mens Data">
            <PieChart
              // data={statsData.Mens || []}
              {...mensConfigure}
              data={statsData?.mens || []}
              style={{ width: "100%", height: "300px" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Womens Data">
            <PieChart
              // data={statsData.womens || []}
              {...womensConfigure}
              data={statsData?.womens || []}
              style={{ width: "100%", height: "300px" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Kids Data">
            <PieChart
              // data={statsData.kids || []}
              {...kidsConfigure}
              data={statsData?.kids || []}
              style={{ width: "100%", height: "300px" }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        {/* <Col span={12}>
          <Card style={{ height: "450px" }}>
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
        </Col> */}
        <Col span={12}>
          <Card title="Trending Analysis">
            <DualAxes {...dualconfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Growth Analysis">
            <Line {...lineconfig} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default DashBoard;
