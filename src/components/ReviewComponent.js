import { Avatar, Rate } from "antd";
import { REVIEWS } from "../common/Constants";

const ReviewComponent = () => {
  const colors = (defaultValue) => {
    if (defaultValue >= 4) {
      return "#52c41a";
    } else if (defaultValue > 2) {
      return "#faad14";
    } else {
      return "#ff4d4f";
    }
  };
  return (
    <>
      <div
        style={{
          margin: "0px 20px 20px 0px",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        Ratings & Reviews
      </div>
      {REVIEWS.map((item, index) => (
        <>
          <div key={index} style={{ margin: "10px 0px 10px 10px" }}>
            <Avatar
              // size="small"
              style={{
                marginRight: "10px",
                backgroundColor: "#0da27d",
                color: "white",
              }}
            >
              {item.name.charAt(0)}
            </Avatar>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>
              {item.name}
            </span>
          </div>
          <div>
            <span style={{ margin: "10px 0px 10px 10px" }}>
              <Rate
                allowClear={false}
                allowHalf
                defaultValue={item.ratings}
                style={{
                  color: colors(item.ratings),
                }}
              />
            </span>
          </div>
          <span style={{ margin: "10px 0px 10px 10px", fontsize: "10px" }}>
            {item.posted}
          </span>
          <div style={{ margin: "10px 0px 10px 10px", fontsize: "20px" }}>
            {item.comment}
          </div>
          <hr />
        </>
      ))}
    </>
  );
};

export default ReviewComponent;
