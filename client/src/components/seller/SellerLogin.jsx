import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import BASE_URL from '../../../config'

export const SellerLogin = () => {

    const {isSeller,setIsSeller,Navigate} = useAppContext()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    useEffect(()=>{
        if(isSeller){
            Navigate('/seller')
        }
    },[isSeller])

    const handleOnSubmit =async(e)=>{
        try {
            e.preventDefault()
            const response = await fetch(`${BASE_URL}/seller/login`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify({email,password})})
            const result = await response.json()
            if(result.success){
                setIsSeller(true)
                Navigate('/seller')
            }
            else{
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return !isSeller && (
    <form onSubmit={handleOnSubmit} className='min-h-screen flex items-center text-sm text-gray-300'>

        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 '>
            <p className='font-medium text-2xl m-auto text-black'><span className='text-blue-600'>Seller</span> Login</p>
            <div className='w-full'>
                <p className='text-black'>Email</p>
                <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='enter your email' className='w-full border border-gray-800 outline-blue-400 p-2 mt-1 rounded' required/>
            </div>
            <div className='w-full'>
                <p className='text-black'>Password</p>
                <input type='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='enter your password' className='w-full border border-gary-800 outline-blue-400 p-2 mt-1 rounded' required/>
            </div>
            <button className='text-white w-full py-2 rounded-md cursor-pointer bg-blue-600'>Login</button>
        </div>

    </form>
  )
}
