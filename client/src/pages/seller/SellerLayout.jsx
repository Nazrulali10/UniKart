import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import BASE_URL from "../../../config";

const SellerLayout = () => {

    const {setIsSeller,Navigate} = useAppContext()

    const sidebarLinks = [
        { name: "Add product", path: "/seller", icon:""},
        { name: "product list", path: "/seller/product-list", icon:"" },
        { name: "Orders", path: "/seller/orders", icon:"" },
    ];

    const logout =async()=>{
        try {
             const response = await fetch(`${BASE_URL}/seller/logout`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},})
             const result = await response.json()
             if(result.success){
                toast.success(result.message)
                Navigate('/')
             }
             else{
                toast.error(result.message)
             }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/'>
                    <img src="/unikart.jpg" alt='brandname' className="h-7"/>
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path === "/seller"} 
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        {item.icon}
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet/>
            </div>
            
        </>
    );
};
export default SellerLayout