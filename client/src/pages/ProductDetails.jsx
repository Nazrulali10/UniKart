import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";


const ProductDetails = () => {

const {products,Navigate,addToCart,currency} = useAppContext()
const {id} = useParams()
const product = products.find((item)=>item._id.toString()===id)

    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    
    useEffect(()=>{
        if(products.length>0){
        let productsCopy = products.slice();
        productsCopy = productsCopy.filter((item)=>product?.category?.toLowerCase()===item.category.toLowerCase())
        setRelatedProducts(productsCopy.slice(0,5))
    }
    },[products])


    useEffect(()=>{
        setThumbnail(product?.images[0]?product.images[0]:null)
    },[product])

    return product && (
        <div className="max-w-6xl w-full px-6 mt-5">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}>Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link> /
                <span className="text-indigo-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border w-15 h-15 md:w-24 md:h-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className="object-contain w-full h-full" />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 w-100 h-130 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="object-contain w-full h-full" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <img className='md:3.5 w-3' key={i} src={i>4?"/images/ratingstars.png":"/images/ratingstars.png"} alt='nm'/>
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>{addToCart(product._id)}} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{addToCart(product._id); Navigate("/cart")}} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-9">
                <div className="flex flex-col items-center w-max">
                    <p className="text-2xl font-medium">Related Products</p>
                    <div className='h-0.5 w-16 rounded-full bg-black'></div>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-6">
                {relatedProducts.filter((product)=>product.inStock).map((product,index)=>(
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
            <button onClick={()=>{Navigate('/products')}} className="mx-auto cursor-pointer my-16 py-4 px-13 border rounded bg-blue">See more</button>
        </div>
    );
};
export default ProductDetails