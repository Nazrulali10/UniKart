import { createContext,useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import BASE_URL from '../../config'
export const AppContext = createContext()

export const AppContextProvider =({children})=>{

const [user,setUser] = useState(null)
const [isSeller,setIsSeller] = useState(false)
const [showUserLogin,setShowUserLogin] = useState(false)
const Navigate = useNavigate()
const [products,setProducts] = useState([])
const [cartItems,setCartItems] = useState({})
const [searchQuery,setSearchQuery] = useState({})

const addToCart = (itemId)=>{
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
        cartData[itemId]+=1
    } else {
        cartData[itemId] = 1
    }
    setCartItems(cartData)
    toast.success("Added to cart")
}

const updateCart =(itemId,quantity)=>{
    let cartData = structuredClone(cartItems)
    cartData[itemId] = quantity
    setCartItems(cartData)
    toast.success("Cart Updated successfully")
}

const removeFromCart = (itemId)=>{
    let cartData = structuredClone(cartItems)
    if(cartData[itemId]){
        cartData[itemId]-=1
        if(cartData[itemId]==0){
            delete cartData[itemId]
        }
    }
    toast.success("Item Successfully removed")
    setCartItems(cartData)
}

const fetchProducts = async()=>{
     try {
        const response = await fetch(`${BASE_URL}/product/productslist`,{method:'GET',credentials:'include',})
     const result = await response.json()
     if(result.success){
        setProducts(result.products)
     }
     else{
        toast.error(result.message)
     }
     } catch (error) {
        toast.error(error.message)
     }
}

const checkSellerAuth = async()=>{
     const response = await fetch(`${BASE_URL}/seller/checkSellerAuth`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},})
     const result = await response.json()
     if(result.success){
        setIsSeller(true)
     }
     else{
        setIsSeller(false)
     }
}

const checkAuth = async()=>{
     const response = await fetch(`${BASE_URL}/user/checkAuth`,{method:'GET',credentials:'include',headers:{'Content-type':'application/json'},})
     const result = await response.json()
     if(result.success){
        

        setUser(result.user)
        setCartItems(result.user.cartItems)
     }
     else{
        setUser(null)
     }
}



useEffect(()=>{
    fetchProducts()
    checkSellerAuth()
    checkAuth()
},[])

useEffect(()=>{
     const updateCart = async ()=>{
        const response = await fetch(`${BASE_URL}/cart/updatecart`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify({cartItems})})
     const result = await response.json()
     
     if(!result.success){
        toast.error(result.error)
     }
     }
     if(user){
        updateCart()
     }
},[cartItems])

const getCartCount =()=>{
    let totalcount = 0
    for(const item in cartItems){
        totalcount+=cartItems[item]
    }
    return totalcount
}

// const getCartAmount =()=>{
//     let totalAmount =0
//     for(const items in cardItems){
//         let iteminfo = products.find((product)=>product._id===Number(items))
//         if(cardItems[items]>0){
//             totalAmount+=iteminfo.offerPrice*cardItems[items]
//         }
//     }
//     return Math.floor(totalAmount*100)/100
// }

const getCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    const itemInfo = products.find(product => String(product._id) === String(itemId)); // safer comparison

    if (itemInfo && typeof itemInfo.offerPrice === "number" && cartItems[itemId] > 0) {
      totalAmount += itemInfo.offerPrice * cartItems[itemId];
    }
  }
  return Math.floor(totalAmount * 100) / 100;
};



const currency = import.meta.env.VITE_CURRENCY;

const value = {Navigate,isSeller,setIsSeller,user,setUser,setShowUserLogin,showUserLogin,products,currency,cartItems,addToCart,updateCart,removeFromCart,searchQuery,setSearchQuery,getCartAmount,getCartCount,fetchProducts,setCartItems}


return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}
export const useAppContext = ()=>{
    return useContext(AppContext)
}