export const MY_ORDERS = [
  {
    orderId: "01122336785005",
    productName: "umberella type chudithar",
    order_id: "112233",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMe9hiUk9elh8I3lb1rD58RO74lCq8-12uA&usqp=CAU",

    deliveryDate: "date of arrival",
    productStatus: "productstatus",
    amount: "₹750",
    color: "red",
    quantity: 2,
    size: "L",
    date: "11-August-23",
    status: "Ordered",
  },
  {
    orderId: "01122336785010",
    productName: "chudithar metrial",
    order_id: "112244",
    imageSrc:
      "https://i.pinimg.com/originals/e2/db/0f/e2db0f061923b852c6ba6f976c35edd1.jpg",
    deliveryDate: "arrival tommorrow",
    productStatus: "product dispatched",
    amount: "₹899",
    color: "green",
    quantity: 3,
    size: "XXL",
    date: "15-August-23",
    status: "Delivered",
  },
  {
    orderId: "01122336785015",
    productName: "checked casual shirt",
    order_id: "112255",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3iOX4vjfOSZYpY6mJLATfL-7tyM8ro80HQg&usqp=CAU",
    deliveryDate: "arriving 12-jun 14",
    productStatus: "prepared for dispatched",
    amount: "₹999",
    color: "red and white",
    quantity: 2,
    size: "M",
    date: "15-August-23",
    status: "Cancelled",
  },
];

export const DETAILS = [
  {
    order_id: "112233",
    shipmentDetails: [
      {
        date: "11-Aug-2023",
        shipments: [
          {
            color: "red",
            label: "11-Aug-2023",
            children: "Order Placed ",
            time: "10.30AM",
          },
        ],
      },
      {
        date: "12-Aug-2023",
        shipments: [
          {
            color: "red",
            label: "12-Aug-2023",
            children: "packed ",
            time: "11.30AM",
          },
        ],
      },
      {
        date: "13-Aug-2023",
        shipments: [
          {
            color: "green",
            label: "13-Aug-2023",
            children: "shipped ",
            time: "2.30PM",
          },
        ],
      },
      {
        date: "13-Aug-2023",
        shipments: [
          {
            color: "green",
            label: "13-Aug-2023",
            children: "delivered ",
            time: "5.00PM",
          },
        ],
      },
    ],
  },
  {
    order_id: "112244",
    shipmentDetails: [
      {
        date: "15-Aug-2023",
        shipments: [
          {
            color: "green",
            label: "15-Aug-2023",
            children: "Order Placed ",
            time: "11.30AM",
          },
        ],
      },
      {
        date: "16-Aug-23",
        shipments: [
          {
            color: "green",
            label: "16-Aug-2023",
            children: "packed ",
            time: "11.30AM",
          },
        ],
      },
      {
        date: "17-Aug-23",
        shipments: [
          {
            color: "green",
            label: "17-Aug-2023",
            children: "shipped ",
            time: "4.30PM",
          },
        ],
      },
      {
        date: "17-Aug-2023",
        shipments: [
          {
            color: "green",
            label: "17-Aug-2023",
            children: "delivered ",
            time: "8.30PM",
          },
        ],
      },
    ],
  },
  {
    order_id: "112255",
    shipmentDetails: [
      {
        date: "15-Aug-2023",
        shipments: [
          {
            color: "red with white",
            label: "15-Aug-2023",
            children: "Order Placed ",
            time: "11.30AM",
          },
        ],
      },
      {
        date: "16-Aug-2023",
        shipments: [
          {
            color: "red with white",
            label: "16-Aug-2023",
            children: "packed ",
            time: "11.30AM",
          },
        ],
      },
      {
        date: "17-Aug-2023",
        shipments: [
          {
            color: "red with white",
            label: "17-Aug-2023",
            children: "shipped ",
            time: "6.30PM",
          },
        ],
      },
      {
        date: "17-Aug-2023",
        shipments: [
          {
            color: "red with white",
            label: "17-Aug-2023",
            children: "delivered ",
            time: "9.00PM",
          },
        ],
      },
    ],
  },
];
