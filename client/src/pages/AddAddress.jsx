import React, { useState } from 'react'
import BASE_URL from '../../config'

import toast from 'react-hot-toast'
import AddressAnimation from '../animations/animations'
import { useAppContext } from '../context/AsppContext'

const InputFeild =({type,placeholder,handleChange,address,name})=>(
        <input className='w-full px-2 py-2.5 border border-gray-500/20 rounded outline-none text-gray-500' type={type} placeholder={placeholder} onChange={handleChange} name={name} value={address[name]} required />
    )
export const AddAddress = () => {

  const {Navigate} = useAppContext()
    

    const onSubmitHandler =async(e)=>{
      try {
        e.preventDefault()
        const response = await fetch(`${BASE_URL}/address/addaddress`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify({address})})
        const result = await response.json()
        if(result.success){
          Navigate('cart')
          toast.success(result.message)
        }
        else{
          toast.error(result.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const [address,setAddress] = useState({
      firstName:'',
      lastName:'',
      email:"",
      mobile:'',
      street:"",
      city:'',
      state:'',
      country:''
    })

    const handleChange =(e)=>{
      const {name,value} = e.target
      setAddress((prevAddress)=>({
        ...prevAddress,[name]:value,
      }))
      
    }
    
  return (
    <div className='mt-16 pb-12'>
        <p className='text-2xl md:text-3xl font-medium '>Add shipping <span className='font-semibold text-blue-600'>address</span></p>
        <div className='flex flex-col md:flex-row justify-between mt-10'>
            
            <div className='flex-1 max-w-md'>
              <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm' >
                <div className='grid grid-cols-2 gap-3'>
                <InputFeild handleChange={handleChange} type="text" address={address} placeholder={"first name"} name="firstName" />
                <InputFeild handleChange={handleChange} type="text" address={address} placeholder={"Last name"} name='lastName' />
                </div>
                <InputFeild handleChange={handleChange} type="email" address={address} placeholder={"email address"} name='email' />
                <InputFeild handleChange={handleChange} type="text" address={address} placeholder={"street"} name='street' />
                <div className='grid grid-cols-2 gap-3'>
                <InputFeild handleChange={handleChange} type="text" address={address} placeholder={"city"} name='city' />
                <InputFeild handleChange={handleChange} type="text" address={address} placeholder={"state"} name='state' />
                </div>
                <InputFeild handleChange={handleChange} type="text" address={address} placeholder={"country"} name='country' />
                <InputFeild handleChange={handleChange} type="number" address={address} placeholder={"Mobile no"} name='mobile' />
                <button className='mt-6 w-full cursor-pointer bg-blue-600 text-white py-3'>
                  Save address
                </button>
              </form>
            </div>
            {/* <img src='/images/bookcat.jpg' alt='addaddress' className="w-full md:w-1/2 object-cover"/> */}
            <div className="-ml-10 md:-mt-30 md:-ml-30">
            <AddressAnimation />
            </div>
        </div>
    </div>
  )
}
