import React, { useEffect, useState } from 'react'


import toast from 'react-hot-toast'
import BASE_URL from '../../../config'
import { useAppContext } from '../../context/AppContext'

export const Orders = () => {
  const [orders,setOrders] = useState([])
  const {currency} = useAppContext()

  const fetchOrders =async()=>{
    try {
        const response = await fetch(`${BASE_URL}/orders/getallorders`,{method:'GET',credentials:'include',headers:{'Content-type':'application/json'},})
        const result = await response.json()
        if(result.success){
            setOrders(result.orders)
        }
        else{
            toast.error(result.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div  className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col  md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-5 max-w-80">
                        <img className="w-12 h-12 object-cover" src='/images/deliverydefault.jpg' alt="delivery" />
                        <div>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col justify-center">
                                    <p className="font-medium">
                                        {item.product.name}{"  "} <span className="text-black">x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm md:text-base text-black-700/60">
                        <p className='text-black'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}, {order.address.state},{order.address.country}</p>
                        <p></p>
                        <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-lg my-auto text-black/70">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: {order.paymenttype}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
     
  )
}
