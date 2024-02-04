import dayjs from "dayjs";
// import DashBoard from "./DashBoard";
import { useEffect, useState } from "react";
import WomensCollections from "./WomensCollections";

const HomePage = () => {
  // const tommorrowDate = dayjs();
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCurrentDate(dayjs());
    // }, 1000);

    
    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <div className="welcome">{currentDate.format("DD-MM-YYYY HH:mm:ss")}</div> */}
      <WomensCollections />
    </>
  );
};
export default HomePage;
