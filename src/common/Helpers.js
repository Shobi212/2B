import { Popconfirm, Space, Tag, Button, Image } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export const getStocksCols = (handleEdit, handleDelete) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "imageSrc",
      key: "Item",
      align: "center",
      render: (text, record) => (
        <Image
          src={record.src}
          alt=""
          style={{ width: "70px", height: "70px" }}
        ></Image>
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "Name",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "Type",
      align: "left",
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "Colors",
      align: "left",
      render: (colors) => (
        <>
          {(colors || []).map((color, index) => (
            <div
              key={index}
              style={{
                width: "30px",
                height: "10px",
                backgroundColor: color,
                display: "inline-block",
                marginRight: "8px",
              }}
            ></div>
          ))}
        </>
      ),
    },

    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "Sizes",
      align: "center",
      render: (sizes) => (
        <>
          {Object.entries(sizes || {}).map(([size, value]) => (
            <Tag key={size}>
              {size}: {value}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "Price",
      align: "center",
      render: (text) => <span>₹{text}</span>,
    },
    {
      title: "Stock Count",
      dataIndex: "quantity",
      key: "Stock Count",
      align: "center",
    },

    {
      title: "Action",
      key: "Action",
      align: "center",
      render: (record) => (
        <>
          <Space size="middle">
            <EditOutlined onClick={() => handleEdit(record)} />
            <Popconfirm
              placement="left"
              title="Delete stock item"
              description="Are you sure to delete this item?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];
  return columns;
};

export const getMyOrdersCols = (handleTrackingOrder) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "imageSrc",
      key: "Item",
      align: "center",
      render: (text, record) => (
        <Image
          src={record?.stock?.src}
          alt={record?.stock?.name}
          style={{ width: "70px", height: "70px" }}
        ></Image>
      ),
    },
    {
      title: "Tracking ID",
      dataIndex: "order_id",
      key: "Tracking Id",
      align: "center",
    },
    {
      title: "Date Of Purchase",
      dataIndex: "dateTime",
      key: "Date Of Purchase",
      align: "center",
    },
    {
      title: "Name",
      // dataIndex: "productName",
      key: "Name",
      render: (text, record) => <span>{record?.stock?.name}</span>,
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "Amount",
      align: "center",
      render: (text) => <span>₹{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "Quantity",
      align: "center",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "Color",
      align: "center",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "Size",
      align: "center",
    },
    {
      title: "Status",
      // dataIndex: "status",
      key: "status",
      align: "center",
      render: (record) => (
        <>
          {record.status === "Delivered" ? (
            <>
              <span style={{ color: "green" }}>
                <CheckCircleOutlined />
              </span>
              <span style={{ marginLeft: "5px", color: "green" }}>
                {record.status}
              </span>
            </>
          ) : record.status === "Cancelled" ? (
            <>
              <span style={{ color: "red" }}>
                <CloseCircleOutlined />
              </span>
              <span style={{ marginLeft: "5px", color: "red" }}>
                {record.status}
              </span>
            </>
          ) : (
            <>
              <span style={{ color: "orange" }}>
                <ClockCircleOutlined />
              </span>
              <span style={{ marginLeft: "5px", color: "orange" }}>
                {record.status}
              </span>
            </>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "Action",
      align: "center",
      render: (record) => (
        <>
          {record.status === "Delivered" ? (
            <Button
              type="primary"
              // style={{ backgroundColor: "green" }}
              onClick={() => handleTrackingOrder(record)}
            >
              View
            </Button>
          ) : record.status === "ordered" ? (
            <Button type="primary" onClick={() => handleTrackingOrder(record)}>
              View
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleTrackingOrder(record)}>
              View
            </Button>
          )}
        </>
      ),
    },
  ];

  return columns;
};
