import Lottie from "lottie-react";
import addressanimation from './addressanimation.json'

export default function AddressAnimation(){
    return(
        <Lottie animationData={addressanimation} loop={true} style={{height:500, width:500}}/>
    )
}