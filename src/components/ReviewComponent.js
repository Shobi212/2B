import { Avatar, Rate } from "antd";

const ReviewComponent = () => {
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

      <div style={{ margin: "10px 0px 10px 10px" }}>
        <Avatar size="small" style={{ marginRight: "10px" }}>
          p
        </Avatar>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          Priya Murugan
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#02371C",
          width: "50px",
          borderRadius: "5px",
          magin: "10px 0px 10px 10px",
        }}
      >
        <span style={{ color: "white", fontSize: "15px" }}>3.9</span>
        <span>
          <Rate
            allowClear={false}
            defaultValue={1}
            count={1}
            style={{
              color: "white",
              fontSize: "10px",
            }}
          />
        </span>
      </div>
      <span style={{ color: "lightGrey" }}>Posted on 12 dec 2023</span>
      <div style={{ margin: "10px 0px 10px 10px", fontsize: "15px" }}>
        It was looking so good,nice product and good quality
      </div>
      <hr />

      <div style={{ margin: "10px 0px 10px 10px" }}>
        <Avatar size="small" style={{ marginRight: "10px" }}>
          S
        </Avatar>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          Shobana Sankar
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#02371C",
          width: "50px",
          borderRadius: "5px",
          margin: "10px 0px 10px 10px",
        }}
      >
        <span style={{ color: "white", fontSize: "15px", marginLeft: "9px" }}>
          3.9
        </span>
        <span>
          <Rate
            allowClear={false}
            defaultValue={1}
            count={1}
            style={{
              color: "white",
              fontSize: "10px",
            }}
          />
        </span>
      </div>
      <span style={{ color: "lightGrey",marginLeft:"10px" }}>Posted on 18 dec 2023</span>
      <div style={{ margin: "10px 0px 10px 10px", fontsize: "15px" }}>
        Nice product and good quality
      </div>
      <hr />

      <div style={{ margin: "10px 0px 10px 10px" }}>
        <Avatar size="small" style={{ marginRight: "10px" }}>
          S
        </Avatar>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          Swetha Lakshmanan
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#02371C",
          width: "40px",
          borderRadius: "5px",
          magin: "10px 0px 10px 10px",
        }}
      >
        <span style={{ color: "white", fontSize: "15px" ,marginLeft: "9px"}}>3.9</span>
        <span>
          <Rate
            allowClear={false}
            defaultValue={1}
            count={1}
            style={{
              color: "white",
              fontSize: "10px",
            }}
          />
        </span>
      </div>
      <span style={{ color: "lightGrey",marginLeft: "10px" }}>Posted on 26 dec 2023</span>
      <div style={{ margin: "10px 0px 10px 10px", fontsize: "15px" }}>
        Very nice good product
      </div>
      <hr />

      <div style={{ margin: "10px 0px 10px 10px" }}>
        <Avatar size="small" style={{ marginRight: "10px" }}>
          G
        </Avatar>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          Gayathiri Mohan
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#02371C",
          width: "50px",
          borderRadius: "5px",
          magin: "10px 0px 10px 10px",
        }}
      >
        <span style={{ color: "white", fontSize: "15px" ,marginLeft: "9px"}}>3.9</span>
        <span>
          <Rate
            allowClear={false}
            defaultValue={1}
            count={1}
            style={{
              color: "white",
              fontSize: "10px",
            }}
          />
        </span>
      </div>
      <span style={{ color: "lightGrey",marginLeft: "10px" }}>Posted on 02 jan 2024</span>
      <div style={{ margin: "10px 0px 10px 0px", fontsize: "15px" }}>
        It was looking so good,nice product and good quality
      </div>
      <hr />

      <div style={{ margin: "10px 0px 10px 10px" }}>
        <Avatar size="small" style={{ marginRight: "10px" }}>
          S
        </Avatar>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          Sowmiya Manogar
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#02371C",
          width: "40px",
          borderRadius: "5px",
          magin: "10px 0px 10px 0px",
        }}
      >
        <span style={{ color: "white", fontSize: "15px" }}>3.9</span>
        <span>
          <Rate
            allowClear={false}
            defaultValue={1}
            count={1}
            style={{
              color: "white",
              fontSize: "10px",
            }}
          />
        </span>
      </div>
      <span style={{ color: "lightGrey" }}>Posted on 25 jan 2024</span>
      <div style={{ margin: "10px 0px 10px 0px", fontsize: "15px" }}>
        It was looking so good,nice product and good quality
      </div>
      <hr />

      <div style={{ margin: "10px 0px 10px 0px" }}>
        <Avatar size="small" style={{ marginRight: "10px" }}>
          T
        </Avatar>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          Thirisha Sankar
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#02371C",
          width: "40px",
          borderRadius: "5px",
          magin: "10px 0px 10px 0px",
        }}
      >
        <span style={{ color: "white", fontSize: "15px" }}>3.9</span>
        <span>
          <Rate
            allowClear={false}
            defaultValue={1}
            count={1}
            style={{
              color: "white",
              fontSize: "10px",
            }}
          />
        </span>
      </div>
      <span style={{ color: "lightGrey" }}>Posted on 04 feb 2024</span>
      <div style={{ margin: "10px 0px 10px 0px", fontsize: "15px" }}>
        Nice product and good quality
      </div>
      <hr />
    </>
  );
};

export default ReviewComponent;
