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
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  InboxOutlined,
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
            // <Tag key={index} color={color}>
            //   {color}
            // </Tag>
            <div
              key={index}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: color,
                // borderRadius: "50%",
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
              // onCancel={cancel}
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

  const { Dragger } = Upload;
  const { Option } = Select;
  // const [fileList, setFileList] = useState([]);

  const handleEdit = (record) => {
    // form.setFieldsValue(record);
    setIsEditing(true);
    setEditAllStocks({ ...record });
  };
  const options = [
    {
      value: "formal shirt",
      label: "formal shirt",
    },
    {
      value: "casual shirt",
      label: "casual shirt",
    },
    {
      value: "jeans",
      label: "jeans",
    },
    {
      value: "skinny fit",
      label: "skinny fit ",
    },
    {
      value: "umberella chudithar",
      label: "umberella chudithar",
    },
    {
      value: "Emberiod Kurtis",
      label: "Emberiod Kurtis",
    },
  ];
  const colorOptions = [
    { value: "red", label: "red" },
    { value: "green", label: "green" },
    { value: "orange", label: "orange" },
    { value: "grey", label: "grey" },
    { value: "blue", label: "blue" },
    { value: "yellow", label: "yellow" },
    { value: "skyblue", label: "skyblue" },
  ];
  const category = [
    { value: "Mens", label: "mens" },
    { value: "Womens", label: "Womens" },
    { value: "Kids", label: "Kids" },
  ];
  const handleFinish = async (values) => {
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

    console.log(stockDetail);

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

    // const customRequest = ({ file, onSuccess, onError }) => {
    //   console.log("File uploaded:", file);
    //   onSuccess();
    // };
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

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
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
        title: editAllStocks.title,
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
        onOk={form.submit}
        okText="save"
        width={900}
        style={{ top: 15 }}
      >
        <Form
          form={form}
          initialValues={editAllStocks}
          onFinish={handleFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          // onValuesChange={onValuesChange}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="Category" name="category">
                <Select placeholder="Select category" options={category} />
                {/* <Input className="wrapper" /> */}
              </Form.Item>
              <Form.Item label="Name" name="name">
                <Input className="wrapper" />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input className="wrapper" />
              </Form.Item>
              <Form.Item label="Quantity" name="quantity">
                <Input className="wrapper" />
              </Form.Item>
              <Form.Item label="Total cost" name="Total cost">
                <Input className="wrapper" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Seller" name="shop">
                <Input className="wrapper" />
              </Form.Item>
              <Form.Item label="Delivery Charge" name="deliveryCharge">
                <Input className="wrapper" />
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
                {/* <Input className="wrapper" /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                label="Sizes"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                <Form.List>
                  {(fields, { add, remove }) => (
                    // <Space
                    //   style={{
                    //     display: "flex",
                    //     marginBottom: 8,
                    //   }}
                    //   align="baseline"
                    // >
                    <>
                      <Space>
                        {sizes.map((size, index) => (
                          <Form.Item
                            style={{ width: "100px" }}
                            key={index}
                            name={["sizes", size]}
                          >
                            <Input
                              addonBefore={size}
                              autoComplete="off"
                              // onChange={onValuesChange}
                              // placeholder={size}
                              className="wrapper"
                            />
                          </Form.Item>
                        ))}
                      </Space>
                    </>
                    // </Space>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={22}>
              <Form.Item>
                <Upload.Dragger
                  fileList={[]}
                  customRequest={customRequest}
                  style={{
                    uploadContainer: {
                      height: "40px", // Set your desired height
                    },
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p>Click or drag file to this area to upload</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default Stocks;
