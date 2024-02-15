import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Upload,
  message,
  InputNumber,
  Image,
} from "antd";
import { PlusOutlined, CloseSquareFilled } from "@ant-design/icons";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../FireBase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { getStocksCols } from "../common/Helpers";
import {
  REVIEWS,
  SHOP_OPTIONS,
  SIZES,
  STOCK_CATEGORY_OPTIONS,
  STOCK_COLOR_OPTIONS,
  STOCK_TYPE_OPTIONS,
} from "../common/Constants";

const Stocks = () => {
  const [mode, setMode] = useState("Add");
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setMode("Edit");
    setShowModal(true);
    setSelectedStock({ ...record });
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onValuesChange = (changedValues, values) => {
    const formItemsToCheck = ["price", "sizes"];
    if (
      formItemsToCheck.some((key) => Object.keys(changedValues).includes(key))
    ) {
      const sizeSum = Object.entries(values.sizes || {}).reduce(
        (acc, [key, val]) => acc + (val || 0),
        0
      );
      const totalCost = values.price * sizeSum;
      form.setFieldsValue({
        quantity: sizeSum,
        totalCost: totalCost,
      });
    }
  };

  const handleAdd = () => {
    setMode("Add");
    setShowModal(true);
    // setSelectedStock(null);
  };

  const closeEditModal = () => {
    setShowModal(false);
    form.resetFields();
    setFileURL(null);
  };

  const handleDelete = (record) => {
    const stocksDocPath = `stocks/${record.stockId}`;
    setDoc(doc(db, stocksDocPath), { ...record, isActive: false })
      .then(() => {
        messageApi.open({
          type: "success",
          key: "msg-key",
          content: (
            <div className="msg-container">Stock deleted successfully</div>
          ),
          icon: <></>,
          className: "custom-success-msg",
          style: {
            marginTop: "3vh",
          },
        });
        setLoading(false);
        setShowModal(false);
        getStocks();
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          key: "msg-key",
          content: (
            <div className="msg-container">Error in document delete</div>
          ),
          icon: <></>,
          className: "custom-error-msg",
          style: {
            marginTop: "3vh",
          },
        });
        setLoading(false);
      });
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    setUploadingFile(true);
    const storageRef = ref(storage, `collections/${file.name}`);
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
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileURL(downloadURL);
          setUploadingFile(false);
          // message.success("file uploaded");
          messageApi.open({
            type: "success",
            key: "msg-key",
            content: <div className="msg-container">File uploaded</div>,
            icon: <></>,
            className: "custom-success-msg",
            style: {
              marginTop: "3vh",
            },
          });
        });
      }
    );
  };

  const handleFinish = async (values) => {
    if (fileURL) {
      setLoading(true);
      const stockDetail = {
        stockId: selectedStock ? selectedStock.stockId : dayjs().valueOf(),
        category: values.category,
        name: values.name,
        src: fileURL,
        type: values.type,
        colors: values.colors,
        sizes: values.sizes,
        price: values.price,
        deliveryCharge: values.deliveryCharge,
        quantity: values.quantity,
        totalCost: values.totalCost,
        rating: selectedStock ? selectedStock.rating : "3.5",
        reviews: selectedStock ? selectedStock.reviews : REVIEWS,
        date: selectedStock
          ? selectedStock.date
          : dayjs().format("YYYY-MM-DD HH:mm:ss"),
        shop: values.shop,
        isActive: true,
      };
      console.log(stockDetail);
      const stocksDocPath = `stocks/${stockDetail.stockId}`;
      setDoc(doc(db, stocksDocPath), stockDetail)
        .then(() => {
          messageApi.open({
            type: "success",
            key: "msg-key",
            content: (
              <div className="msg-container">Stock saved successfully</div>
            ),
            icon: <></>,
            className: "custom-success-msg",
            style: {
              marginTop: "3vh",
            },
          });
          setLoading(false);
          // setShowModal(false);
          getStocks();
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            key: "msg-key",
            content: <div className="msg-container">Something went wrong</div>,
            icon: <></>,
            className: "custom-error-msg",
            style: {
              marginTop: "3vh",
            },
          });
          setLoading(false);
        });
    } else {
      messageApi.open({
        type: "error",
        key: "msg-key",
        content: <div className="msg-container">Please upload file</div>,
        icon: <></>,
        className: "custom-error-msg",
        style: {
          marginTop: "3vh",
        },
      });
    }
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

    // if (selectedStock) {
    //   const updatedData = stocks.map((item) =>
    //     item.type === selectedStock.type ? newData : item
    //   );
    //   setStocks(updatedData);
    // } else {
    //   setStocks([...stocks, newData]);
    // }
    // setShowModal(false);

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

  const getStocks = () => {
    setLoading(true);
    const tmpStocksArray = [];
    getDocs(collection(db, "stocks"))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          tmpStocksArray.push(doc.data());
        });
        const activeStocks = tmpStocksArray.filter((stock) => stock.isActive);
        setStocks(activeStocks);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.group(error);
        messageApi.open({
          type: "error",
          key: "msg-key",
          content: <div className="msg-container">Something went wrong</div>,
          icon: <></>,
          className: "custom-error-msg",
          style: {
            marginTop: "3vh",
          },
        });
      });
  };

  // const loadScript = async () => {
  //   // for (const [index, item] of MENS_DETAILS.entries()) {
  //   // for (const [index, item] of WOMENS_DETAILS.entries()) {
  //   for (const [index, item] of KIDS_DETAILS.entries()) {
  //     let tmpItem = {
  //       ...item,
  //       ...{
  //         colors: ["Blue", "Grey", "Orange"],
  //         sizes: {
  //           S: 2,
  //           M: 4,
  //           L: 2,
  //           XL: 2,
  //           XXL: 2,
  //         },
  //         price: 750,
  //         deliveryCharge: 0,
  //         quantity: 30,
  //         totalCost: 2000,
  //       },
  //       ...{
  //         date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  //         stockId: dayjs().valueOf() + index,
  //         isActive: true,
  //         reviews: REVIEWS,
  //         shop: "2B Boutique",
  //       },
  //     };
  //     console.log("Item : " + index);
  //     console.log(tmpItem);
  //     const stocksDocPath = `stocks/${tmpItem.stockId}`;
  //     await setDoc(doc(db, stocksDocPath), tmpItem);
  //   }
  // };

  // const loadOrderDetails = async () => {
  //   for (const order of DETAILS) {
  //     const ordersPath = `order_details/${order.order_id}`;
  //     await setDoc(doc(db, ordersPath), order);
  //   }
  // };
  const sortedOptions = STOCK_COLOR_OPTIONS.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  useEffect(() => {
    getStocks();
    // loadScript();
    // loadOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedStock) {
      form.setFieldsValue({
        category: selectedStock.category,
        name: selectedStock.name,
        price: selectedStock.price,
        quantity: selectedStock.quantity,
        totalCost: selectedStock.totalCost,
        shop: selectedStock.shop,
        deliveryCharge: selectedStock.deliveryCharge,
        type: selectedStock.type,
        colors: selectedStock.colors,
        sizes: selectedStock.sizes,
      });
      setFileURL(selectedStock.src);
    }
  }, [selectedStock, form]);

  return (
    <>
      {contextHolder}
      <Row justify="end" style={{ marginBottom: "0px" }}>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: "15px" }}
        >
          Add New Stocks
        </Button>
      </Row>
      {/* <Row justify="start" style={{ marginTop: "0px 0px 10px 0px" }}>
        <span style={{ color: "black", fontSize: "20px" }}>Stock Details</span>
      </Row> */}
      <Table
        dataSource={stocks}
        loading={loading}
        columns={getStocksCols(handleEdit, handleDelete)}
        title={() => (
          <Row justify="start" style={{ marginTop: "0px 0px 10px 0px" }}>
            <span style={{ color: "black", fontSize: "20px" }}>
              Stock Details
            </span>
          </Row>
        )}
      ></Table>
      <Modal
        title={`${mode} Stock`}
        open={showModal}
        onCancel={closeEditModal}
        footer={null}
        width={750}
        style={{ top: 15 }}
        closable={false}
        closeIcon={<CloseSquareFilled className="modal_close_icon" />}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          onValuesChange={onValuesChange}
          initialValues={{ price: 0, shop: "2B Boutique", deliveryCharge: 25 }}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please enter category",
                  },
                ]}
              >
                <Select
                  placeholder="Select category"
                  options={STOCK_CATEGORY_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please enter quantity",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} readOnly min={0} />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please enter price",
                  },
                ]}
              >
                <InputNumber addonBefore={<span>₹</span>} min={0} />
              </Form.Item>
              <Form.Item
                label="Total cost"
                name="totalCost"
                rules={[
                  {
                    required: true,
                    message: "Please enter totalcost",
                  },
                ]}
              >
                <InputNumber readOnly addonBefore={<span>₹</span>} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Seller"
                name="shop"
                rules={[
                  {
                    required: true,
                    message: "Please enter shop",
                  },
                ]}
              >
                <Select options={SHOP_OPTIONS} />
              </Form.Item>
              <Form.Item
                label="Delivery Charge"
                name="deliveryCharge"
                rules={[
                  {
                    required: true,
                    message: "Please enter delivery charge",
                  },
                ]}
              >
                <InputNumber
                  addonBefore={<span>₹</span>}
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please enter type",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select type"
                  filterOption={filterOption}
                  options={STOCK_TYPE_OPTIONS}
                />
              </Form.Item>

              <Form.Item
                label="Colors"
                name="colors"
                rules={[
                  {
                    required: true,
                    message: "Please enter color",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select color"
                  options={sortedOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                label="Size"
                name="sizes"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter size value",
                  },
                ]}
              >
                <Form.List>
                  {(fields, { add, remove }) => (
                    <>
                      <Space>
                        {SIZES.map((size, index) => (
                          <Form.Item
                            style={{ width: "100px" }}
                            key={index}
                            name={["sizes", size]}
                          >
                            <InputNumber
                              addonBefore={size}
                              autoComplete="off"
                              min={0}
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
            <Col span={9}>
              <Form.Item
                label="Upload"
                labelCol={{ span: 11 }}
                wrapperCol={{ span: 5 }}
                rules={[
                  {
                    required: true,
                    message: "Please upload image",
                  },
                ]}
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
            {fileURL && (
              <Col span={4}>
                <Image width={100} height={100} src={fileURL} />
              </Col>
            )}
          </Row>
          <Row justify="end">
            <Col>
              <Space>
                <Button onClick={closeEditModal} className="allButtons">
                  Cancel
                </Button>
                <Button
                  disabled={uploadingFile}
                  loading={loading}
                  type="primary"
                  className="allButtons"
                  htmlType="submit"
                >
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
