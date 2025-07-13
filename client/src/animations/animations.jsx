import Lottie from "lottie-react";
import addressanimation from './addressanimation.json'

export default function AddressAnimation(){
    return(
        <div className="flex justify-center items-center">
  <Lottie 
    animationData={addressanimation} 
    loop={true} 
    className="w-60 h-60 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px]"
  />
</div>

    )
}