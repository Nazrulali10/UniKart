import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from './ProductCard'

export const ProductCategory = () => {
    const {products} = useAppContext()
    const {category} = useParams()
    const searchCategory = categories.find((item)=>item.path.toLowerCase()===category.toLowerCase())
    const filteredProducts = products.filter((product)=>(product.category.toLowerCase()===category))

  return (
    <div className='mt-16'>
        {searchCategory&&
            <div className='w-max flex flex-col items-end'>
                <p className='text-2xl font-medium '>{searchCategory.name.toUpperCase()}</p>
                <div className='h-0.5 w-16 rounded-full bg-black'></div>
            </div>
        }
        <div>
            {filteredProducts.length>0?
            <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-6'>
                {filteredProducts.map((product)=>(
                   
                   <ProductCard key={product._id} product={product}/>
                   
                ))}
            </div>:
            <div className='justify-center items-center text-3xl font-medium'>No Results found</div>

            }
        </div>
    </div>
  )
}
