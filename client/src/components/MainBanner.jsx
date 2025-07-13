// import React from 'react'
// import { Link } from 'react-router-dom'

// export const MainBanner = () => {
//   return (
//     <div className='relative'>
//         <img src='/banner.jpg' alt='banner' className='w-full hidden md:block'/>
//         <img src='/images/bannerm.jpg' alt='banner' className='w-full md:hidden'/>
//         <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
//             <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold ml-50 md:ml-0  md:text-left max-w-72 md:max-w-90 lg:max-w-110 leading-tight'>Shop What You Love , Not what others Love!</h1>
        
//         <div className='flex md:items-center mt-6 font-medium '>
//             <Link to={'/products'} className="px-6 py-3 bg-blue-300 text-back-400  rounded hover:bg-blue-200 transition">Shop now</Link>
//             <Link to={'/products'} className="hidden md:block px-6 py-3 border border-gray-400 rounded hover:border-blue-700 transition">Explore deals</Link>
//         </div>
//         </div>
//     </div>
//   )
// }
import React from 'react';
import { Link } from 'react-router-dom';

export const MainBanner = () => {
  return (
    <div className="relative">
      {/* Desktop banner image */}
      <img src="/banner.jpg" alt="banner" className="w-full hidden md:block" />
      {/* Mobile banner image */}
      <img src="/images/bannerm.jpg" alt="banner" className="w-full md:hidden" />
      
      {/* Text container */}
      <div 
        className="
          absolute inset-0 flex 
          flex-col 
          justify-center       /* Vertically center */
          items-end md:items-start  /* Mobile: right align, Desktop: left align */
          px-4 
          md:pl-18 lg:pl-24
          pb-24 md:pb-0
        "
      >
        <h1 
          className="
            text-2xl md:text-4xl lg:text-5xl 
            font-bold 
            max-w-xs md:max-w-3xl lg:max-w-5xl 
            leading-tight 
            text-right md:text-left   /* Mobile right text, desktop left */
          "
        >
          Shop What You Love, Not what others Love!
        </h1>

        <div className="flex md:items-center mt-6 font-medium gap-4">
          <Link 
            to={'/products'} 
            className="px-6 py-3 bg-blue-300 text-black rounded hover:bg-blue-200 transition"
          >
            Shop now
          </Link>
          <Link 
            to={'/products'} 
            className="hidden md:block px-6 py-3 border border-gray-400 rounded hover:border-blue-700 transition"
          >
            Explore deals
          </Link>
        </div>
      </div>
    </div>
  );
}

