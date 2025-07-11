import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import BASE_URL from "../../config";
import toast from "react-hot-toast";

export const MyOrders = () => {
  const [myOrders, setMyorders] = useState([]);
  const { currency,user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders/getuserorders`,{method:'GET',credentials:'include',headers:{'Content-type':'application/json'},})
      const result = await response.json()
      if(result.success){
        setMyorders(result.orders)
      }
      else{
        toast.error(result.messsage)
      }
    } catch (error) {
      toast.error(error.messsage)
    }
  };
  useEffect(() => {
    if(user){
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-12">
      <div className="w-max flex flex-col items-end mb-15">
        <p className="text-2xl font-medium">My orders</p>
        <div className="h-0.5 w-16 rounded-full bg-black"></div>
      </div>
      {myOrders?.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-10 px-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>order id : {order._id}</span>
            <span>Payment type : {order.paymenttype}</span>
            <span>
              Total amount : {currency}
              {order.amount}
            </span>
          </p>
          {order.items.map((item, index) => (
            <div key={index} className={`relative bg-white text-gray-500/70 ${order.items.length!==index+1 && "border-b"}border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
              <div className="flex items-center mb-4 md:mb-0">
                <div className="rounded-lg p-4">
                  <img className="w-16 h-16" src={item.product.images[0]} alt={item.product.name} />
                </div>

                <div className="ml-4">
                  <h2 className="text-gray-800 font-medium text-xl">
                    {item.product.name}
                  </h2>
                  <p>{item.product.category}</p>
                </div>
                </div>

                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 ">
                  <p>Quantity : {item.quantity || "1"}</p>
                  <p>status : {order.status}</p>
                </div>
                <p className="text-lg font-medium">
                  Amount : {currency} {item.offerPrice ? item.offerPrice * item.quantity : item.product.price * item.quantity}

                </p>
              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
