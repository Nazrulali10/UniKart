export const categories = [
  {
    name: "Books and Study Materials",
    path: "books",
    image: "/images/book.jpg",
    bgColor: "rgb(254,202,202)",
  },

  {
    name: "Electronics",
    path: "electronics",
    image: "/images/electro.jpg",
    bgColor: "rgb(251,207,232)",
  },

  {
    name: "Hostel essentials",
    path: "hostelessentials",
    image: "/images/hostel.jpg",
    bgColor: "rgb(187,247,208)",
  },

  {
    name: "Stationaries",
    path: "stationaries",
    image: "/images/stationary.jpg",
    bgColor: "rgb(191,219,254)",
  },
];

export const DummyProducts = [
  {
    _id:1,
    name:"cricket bat",
    image:["/images/crickbat.jpg","/images/c2.jpg","/images/c3.jpg","/images/c4.jpg"],
    category:"Sports",
    price:835,
    offerPrice:700,
    description:["Long handlebar with grip , made with strong white wood , best for power hitting."],
    inStock:true
  },
  {
    _id:2,
    name:"Encyclopedia",
    image:["/images/book.jpg","/images/b2.webp","/images/b3.jpg","/images/b4.jpg"],
    category:"Books",
    price:645,
    offerPrice:300,
    description:["Long handlebar with grip , made with strong white wood , best for power hitting."],
    inStock:true
  },
  {
    _id:3,
    name:"Red gown",
    image:["/images/redgown.jpg","/images/r2.jpg","/images/r3.jpg","/images/r4.jpg"],
    category:"Dress",
    price:845,
    offerPrice:450,
    description:["Long handlebar with grip , made with strong white wood , best for power hitting."],
    inStock:true
  },
  {
    _id:4,
    name:"football",
    image:["/images/football.jpg","/images/f2.jpg","/images/f3.jpg","/images/f4.jpg"],
    category:"Sports",
    price:835,
    offerPrice:500,
    description:["Long handlebar with grip , made with strong white wood , best for power hitting."],
    inStock:true
  },
  {
    _id:5,
    name:"Asus laptop",
    image:["/images/laptop.jpg","/images/l2.jpg","/images/l3.jpg","/images/l4.jpg"],
    category:"Tech",
    price:835,
    offerPrice:600,
    description:["Long handlebar with grip , made with strong white wood , best for power hitting."],
    inStock:true
  }
]
export const features = [
  {
    icon:"/images/delivery.png",
    name:"Faster Delivery",
    description:"24/7 Fast delivery available"
  },
  {
    icon:"/images/quality.png",
    name:"Quality Products",
    description:"High quality certified products"
  },
  {
    icon:"/images/discount.png",
    name:"Best Discounts",
    description:"Never miss the weekly discounts!"
  }
]

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];


export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: DummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: DummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: DummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];
