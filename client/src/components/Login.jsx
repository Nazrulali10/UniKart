import React from "react";
import { useAppContext } from "../context/AppContext";
import BASE_URL from "../../config";
import toast from "react-hot-toast";

const Login = () => {
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {setShowUserLogin,setUser,Navigate} = useAppContext()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/user/${state}`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify({name,email,password})})
        const result = await response.json()
        if(result.success){
            setUser(result.user)
            Navigate('/')
            setShowUserLogin(false)
            toast.success(result.message)
        }
        else{
            toast.error(result.message)
        }
        } catch (error) {
            toast.error(error.message)
        }
        
    }


    return (
        <div onClick={()=>setShowUserLogin(false)} className="fixed right-0 left-0 top-0 bottom-0 z-30 items-center bg-black/50 flex">
        <form onSubmit={handleSubmit} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
        </div>
    );
};
export default Login