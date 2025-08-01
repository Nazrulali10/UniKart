import { useEffect, useState } from "react"

import { useAppContext } from "../context/AppContext"
import BASE_URL from "../../config"
import toast from "react-hot-toast"

const Cart = () => {
    const [showAddress, setShowAddress] = useState(false)
    const {products,cartItems,removeFromCart,Navigate,getCartCount,getCartAmount,currency,updateCart,user,setCartItems} = useAppContext()
    const [cartArray, setCartArray] = useState([])
    const [addresses, setAddresses] = useState([])
    const [selectedAddress,setSelectedAddress] = useState(null)
    const [paymentOption,setPaymentOption] = useState("COD")

    // const getCartItmes =()=>{
    //     let TempArray =[]
    //     for(const key in cartItems){
    //         const product = products.find((item)=>item._id===Number(key))
    //         product.quantity =cartItems[key]
    //         TempArray.push(product)
    //     }
    //     setCartArray(TempArray)
    // }

    const getCartItmes = () => {
  let TempArray = [];
  for (const key in cartItems) {
    const product = products.find(item => String(item._id) === String(key));
    if (product) {
      product.quantity = cartItems[key];
      TempArray.push(product);
    }
  }
  setCartArray(TempArray);
};


    const placeOrder =async()=>{
        try {
            if(!selectedAddress){
                toast.error("select an address")
            }
            if(paymentOption==="COD"){
                const response = await fetch(`${BASE_URL}/orders/placeordercod`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify({userId:user._id,address:selectedAddress._id,items:cartArray.map(item=>({product:item._id,quantity:item.quantity}))})})
                const result = await response.json()
                if(result.success){
                    setCartItems({})
                    Navigate('/my-orders')
                    toast.success(result.message)
                }
                else{
                    toast.error(result.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getaddresses = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/address/getaddress`,{method:'GET',credentials:'include',headers:{'Content-type':'application/json'},})
            const result = await response.json()
            if(result.success){
                setAddresses(result.addresses)
            }
            if(result.addresses.length>0){
                setSelectedAddress(result.addresses[0])
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(products.length>0 && cartItems){
            getCartItmes()
        }
    },[products,cartItems])

    useEffect(()=>{
        if(user){
            getaddresses()
        }
    },[user])

    return products.length>0 && cartItems ?(
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()} items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=>{Navigate(`/products/${product.category}/${product._id}`)}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={(e)=>{updateCart(product._id,Number(e.target.value))}} value={cartItems[product._id]} className='outline-none'>
                                            {Array(cartItems[product._id]>9?cartItems[product._id]:9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={()=>{removeFromCart(product._id)}} className="cursor-pointer mx-auto">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button onClick={()=>{Navigate("/products")}} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress?(`${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`):('No address found')}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses?.map((address,index)=>(
                                    <p key={index} onClick={() => {setSelectedAddress(address); setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                    {address.street}, {address.city}, {address.state}, {address.country}
                                </p>
                                ))}
                                
                                <p onClick={() => Navigate('/add-address')} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={(e)=>setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online" disabled>Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount()*2/100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{ getCartAmount() + getCartAmount()*2/100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    {paymentOption==="COD"?("Place order"):("Proceed to pay")}
                </button>
            </div>
        </div>
    ):null
}
export default Cart