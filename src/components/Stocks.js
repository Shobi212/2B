import { useEffect, useState } from "react";
import { COLORS_WITH_EXCODES, SIZES, WOMENS_DETAILS } from "../common/Constant";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Upload,
  message,
  InputNumber,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  InboxOutlined,
  PlusOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { MENS_DETAILS } from "../common/MensConstant";
// import { storage, storageRef } from "../FireBase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../FireBase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const sizes = ["S", "M", "L", "XL", "XXL"];
const Stocks = () => {
  const WomensColumn = [
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
      align: "center",
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "Colors",
      align: "center",
      render: (colors) => (
        <>
          {(colors || []).map((color, index) => (
            <div
              key={index}
              style={{
                width: "30px",
                height: "15px",
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
          {(sizes || []).map(({ size, value }) => (
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
      dataIndex: "stockCount",
      key: "Stock Count",
      align: "center",
    },

    {
      title: "Action",
      key: "Action",
      align: "center",
      render: (record) => (
        <>
          <Space>
            <EditOutlined onClick={() => handleEdit(record)} />
            <Popconfirm
              placement="leftTop"
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

  const allStocks = [...WOMENS_DETAILS, ...MENS_DETAILS];
  const [allStocksDetail, setallStocksDetail] = useState(allStocks);
  const [isEditing, setIsEditing] = useState(false);
  const [editAllStocks, setEditAllStocks] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [form] = Form.useForm();
  const [sum, setSum] = useState(0);
  const { Dragger } = Upload;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  // const [fileList, setFileList] = useState([]);

  const handleEdit = (record) => {
    // form.setFieldsValue(record);
    setIsEditing(true);
    setEditAllStocks({ ...record });
  };
  const options = [
    {
      value: "Formal shirt",
      label: "Formal shirt",
    },
    {
      value: "Casual shirt",
      label: "Casual shirt",
    },
    {
      value: "Jeans",
      label: "Jeans",
    },
    {
      value: "Skinny fit",
      label: "Skinny fit ",
    },
    {
      value: "Umberella chudithar",
      label: "Umberella chudithar",
    },
    {
      value: "Emberiod Kurtis",
      label: "Emberiod Kurtis",
    },
  ];
  const colorOptions = [
    { value: "Red", label: "Red" },
    { value: "Green", label: "Green" },
    { value: "Orange", label: "Orange" },
    { value: "Grey", label: "Grey" },
    { value: "Blue", label: "Blue" },
    { value: "Yellow", label: "Yellow" },
    { value: "Skyblue", label: "Skyblue" },
  ];
  const category = [
    { value: "Mens", label: "Mens" },
    { value: "Womens", label: "Womens" },
    { value: "Kids", label: "Kids" },
  ];

  const onValuesChange = (_, values) => {
    // const quantity = sum(values.size || []);
    const sizeSum = (values.size || []).reduce(
      (acc, val) => acc + (val || 0),
      0
    );

    form.setFieldsValue({
      quantity: sizeSum,
    });

    const totalCost = values.price * values.quantity;
    // const quantity = sizeSum;
    form.setFieldsValue({
      totalCost: totalCost,
    });
  };
  const handleFinish = async (values) => {
    console.log("Values");
    console.log(values);

    const stockDetail = {
      stockId: 1,
      category: "mens",
      name: "Mens jeans",
      src: imageUrl,
      type: "super skinny fit",
      colors: ["blue", "grey", "skyblue", "black", "lightblue"],
      sizes: [
        { size: "S", value: 10 },
        { size: "M", value: 6 },
        { size: "L", value: 8 },
        { size: "XL", value: 5 },
        { size: "XXL", value: 10 },
        { size: "XXXL", value: 9 },
      ],
      price: 750,
      deliveryCharge: 0,
      quantity: 30,
      cost: 2000,
      date: "10-jan-2023",
      shop: "@2B Boutique",
    };

    // console.log(stockDetail);

    // const updatedSizes = values.sizes.map((size) => ({
    //   ...size,
    //   key: size.value,
    // }));
    // const updatedColors = values.colors.map((color) => ({
    //   ...color,
    //   key: color,
    // }));
    // const sumOfQuantity = values.size;
    // const stocksDetails = {
    //   category: values.category,
    //   name: values.name,
    //   type: values.type,
    //   colors: values.colors,
    //   sizes: values.sizes,
    //   price: values.price,
    //   // quantity: sumOfQuantity,
    //   date: values.date,
    //   shop: values.shop,
    // };
    // console.log("stock details", values);
    // for (const user of stocksDetails) {
    //   await setDoc(doc(db, "stocks", user.stockId.toString()), user);
    // }

    // if (editAllStocks) {
    //   const updatedData = allStocksDetail.map((item) =>
    //     item.type === editAllStocks.type ? newData : item
    //   );
    //   setallStocksDetail(updatedData);
    // } else {
    //   setallStocksDetail([...allStocksDetail, newData]);
    // }
    // setIsEditing(false);

    // const docRef = doc(db, "users", "1"); // to get particular user data

    // const docSnap = await getDocs(collection(db, "stocks"));
    // // const userData = docSnap.data();
    // // console.log("user Data");
    // // console.log(userData);

    // console.log("all data");
    // console.log(docSnap);

    // docSnap.forEach((doc) => {
    //   console.log("Particular data");
    //   console.log(doc.data());
    // });

    // const userDetails = [
    //   {
    //     stockId: 2,
    //     category: "mens",
    //     name: "Mens shirt",
    //     src: "https://img.freepik.com/free-photo/man-portrait_1296-626.jpg?size=626&ext=jpg&ga=GA1.1.2091009926.1696475451&semt=ais",
    //     type: "causal shirt",
    //     colors: ["blue", "grey", "skyblue", "black", "lightblue"],
    //     sizes: [
    //       { size: "S", value: 10 },
    //       { size: "M", value: 6 },
    //       { size: "L", value: 8 },
    //       { size: "XL", value: 5 },
    //       { size: "XXL", value: 10 },
    //       { size: "XXXL", value: 9 },
    //     ],
    //     price: 750,
    //     deliveryCharge: 0,
    //     shop: "@2B Boutique",
    //   },
    // ];
    // for (const user of userDetails) {
    //   await setDoc(doc(db, "stocks", user.stockId.toString()), user);
    // }

    // userDetails.forEach(async (user) => {
    // });

    // .then((res) => {
    //   console.log("Data updated", res);
    // })
    // .catch((error) => {
    //   console.log(error, "data update failed");
    // });
  };

  const handleAdd = () => {
    setIsEditing(true);
    // setEditAllStocks(null);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    form.resetFields();
  };
  const handleDelete = (record) => {
    const deleteData = allStocksDetail.filter(
      (item) => item.type != record.type
    );
    setallStocksDetail(deleteData);

    console.log("delete successfully");
  };

  // const props = {
  //   name: "file",
  //   multiple: true,
  //   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

  const CustomDragger = () => {
    const checkFileType = (file) => {
      const isImage = allowedImageTypes.includes(file.type);
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage;
    };
  };
  const customRequest = ({ file, onSuccess, onError }) => {
    setUploadingFile(true);
    const storageRef = ref(storage, `collections/${file.name}`);
    // const uploadTask = storageRef.child(`uploads/${file.name}`).put(file);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log(error);
      });

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploadingFile(false);
          message.success("file uploaded");
          // console.log("File available at", downloadURL);
        });
      }
    );
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  // const onValuesChange = (_, allValues) => {
  // const onValuesChange = (allValues) => {
  //   console.log("All Values");
  //   console.log(allValues);
  //   // // Calculate the sum of all item values in the Form.List
  //   // const sum = allValues.listItems.reduce((acc, item) => {
  //   //   // Assuming itemValue is the key used for storing the values in each form item
  //   //   return acc + parseFloat(item.itemValue || 0);
  //   // }, 0);

  //   // Set the sum to another form item
  //   // form.setFieldsValue({
  //   //   totalSum: sum.toFixed(2), // Adjust as needed
  //   // });
  // };

  useEffect(() => {
    if (editAllStocks) {
      form.setFieldsValue({
        category:editAllStocks.category,
        name: editAllStocks.name,
        price:editAllStocks.price,
        quantity:editAllStocks.quantity,
        totalCost:editAllStocks.totalCost,
        shop:editAllStocks.shop,
        deliveryCharge:editAllStocks.deliveryCharge,
        type: editAllStocks.type,
        color: editAllStocks.colors,
        sizes: editAllStocks.sizes.map((size) => ({
          ...size,
          key: size.value,
        })),
      });
    }
  }, [editAllStocks, form]);

  return (
    <>
      <Row justify="end">
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: "15px" }}
        >
          Add New Stocks
        </Button>
      </Row>
      <Table dataSource={allStocksDetail} columns={WomensColumn}></Table>
      <Modal
        title="Edit Stock Details"
        open={isEditing}
        onCancel={closeEditModal}
        footer={null}
        width={750}
        style={{ top: 15 }}
        closable="false"
      >
        <Form
          form={form}
          initialValues={editAllStocks}
          onFinish={handleFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          onValuesChange={onValuesChange}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="Category" name="category">
                <Select placeholder="Select category" options={category} />
              </Form.Item>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Quantity" name="quantity">
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item label="Total cost" name="totalCost">
                <InputNumber readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Seller" name="shop">
                <Input />
              </Form.Item>
              <Form.Item label="Delivery Charge" name="deliveryCharge">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Type" name="type">
                <Select placeholder="Select a type" options={options} />
              </Form.Item>

              <Form.Item label="Colors" name="colors">
                <Select
                  mode="multiple"
                  placeholder="select color"
                  options={colorOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                label="Size"
                name="size"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                <Form.List>
                  {(fields, { add, remove }) => (
                    <>
                      <Space>
                        {sizes.map((size, index) => (
                          <Form.Item
                            style={{ width: "100px" }}
                            key={index}
                            name={["sizes", size]}
                          >
                            <InputNumber
                              addonBefore={size}
                              autoComplete="off"
                              onChange={onValuesChange}
                              // placeholder={size}
                            />
                          </Form.Item>
                        ))}
                      </Space>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                label="Upload"
                valuePropName="fileList"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                // getValueFromEvent={normFile}
              >
                <Upload
                  listType="picture-card"
                  fileList={[]}
                  customRequest={customRequest}
                >
                  <button
                    style={{
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Space>
                <Button onClick={closeEditModal} className="allButtons">
                  Cancel
                </Button>
                <Button type="primary" className="allButtons" htmlType="submit">
                  Save
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default Stocks;
