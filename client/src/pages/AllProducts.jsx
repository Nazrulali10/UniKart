import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import ProductCard from "../components/ProductCard";

export const AllProducts = () => {
  const [filteredProducts,setFilteredProducts] = useState([])
  const {products,searchQuery} = useAppContext()

  useEffect(()=>{
    if(searchQuery.length>1){
      setFilteredProducts(products.filter(product=>product.name.toLowerCase().includes(searchQuery.toLowerCase())))
    }
    else{
      setFilteredProducts(products)
    }
  },[searchQuery,products])

  return (
    <div className='mt-16 flex flex-col'>

        <div className='items-end flex flex-col w-max'>
            <p className='uppercase text-2xl font-medium'>All Products</p>
            <div className='h-0.5 w-16 rounded-full bg-black'></div>
        </div>

        <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-6'>
          {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
            <ProductCard key={index} product={product} />
          ))}
        </div>

    </div>
  )
}
