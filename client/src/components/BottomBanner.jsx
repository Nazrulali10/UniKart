// import React from 'react'
// import { features } from '../assets/assets'

// export const BottomBanner = () => {
//   return (
//     <div className='relative absolute mt-24 mb-1' >
//         <img className='w-full hidden md:block' src='/images/bottombanner.jpg'/>
//         <img className='w-full block md:hidden' src='/images/bottombannerm.jpg'/>
//         <div className='absolute inset-0 flex flex-col md:items-end items-center md:justify-center md:pt-0 pt-20 md:pr-26'>
//           <div>
//             <h1 className='font-semibold text-2xl md:text-3xl'>Why we are the Best !</h1>
//             {
//               features.map((feature,index)=>(
//                 <div className='flex items-center gap-4 mt-2' key={index}>
//                   <img className='w-8 md:w-11' src={feature.icon}/>
//                   <div className='p-3'>
//                   <h1 className='text-md md:text-xl'>{feature.name}</h1>
//                   <p className='text-xm md:text-sm'>{feature.description}</p>
//                   </div>
//                 </div>
//               ))
//             }
//           </div>
//         </div>
//     </div>
//   )
// }
import React from 'react';
import { features } from '../assets/assets';

export const BottomBanner = () => {
  return (
    <div className="relative mt-24 mb-1">
      {/* Background image */}
      <img 
        className="w-full h-full object-cover absolute inset-0 z-0 hidden md:block" 
        src="/images/bottombanner.jpg" 
        alt="Bottom Banner Desktop" 
      />
      <img 
        className="w-full h-full object-cover absolute inset-0 z-0 md:hidden" 
        src="/images/bottombannerm.jpg" 
        alt="Bottom Banner Mobile" 
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col md:items-end items-center justify-center py-12 md:pr-26 md:py-12 px-4">
        <div className=" p-4 rounded-md ">
          <h1 className="font-semibold text-2xl md:text-3xl text-center md:text-right">
            Why we are the Best!
          </h1>
          {features.map((feature, index) => (
            <div className="flex items-center gap-4 mt-2" key={index}>
              <img className="w-8 md:w-11" src={feature.icon} alt={feature.name} />
              <div className="p-1">
                <h2 className="text-md md:text-xl">{feature.name}</h2>
                <p className="text-sm md:text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
