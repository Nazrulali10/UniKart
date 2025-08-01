import React from 'react'
import { useAppContext } from '../context/AppContext';



const ProductCard = ({product}) => {
    const [count, setCount] = React.useState(0);
    const {currency,addToCart,removeFromCart,Navigate,cartItems} = useAppContext()
    

    return product&&(
        <div onClick={()=>{Navigate(`/products/${product.category.toLowerCase()}/${product._id}`)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2 h-36 md:h-44 overflow-hidden">
    <img 
        className="group-hover:scale-105 transition-transform duration-200 object-contain h-full"
        src={product.images[0]}
        alt={product.name}
    />
</div>

            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                       
                            <img className='md:3.5 w-3' key={i} src={i>4?"/images/ratingstars.png":"/images/ratingstars.png"} alt='nm'/>
                      
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-indigo-500">
                        {currency}{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e)=>{e.stopPropagation()}} className="text-indigo-500">
                        {!cartItems[product._id]?(
                            <button onClick={()=>{addToCart(product._id)}} className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium" >
                                <img className='w-3 md:w-3.5' src='/images/shopping-cart.png'/>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                <button onClick={() =>{removeFromCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;