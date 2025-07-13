import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import toast from "react-hot-toast";
import BASE_URL from "../../config";
import { useAppContext } from "../context/AppContext";
export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    Navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext();

  const logout = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user/logout`,{method:'GET',credentials:'include',headers:{'Content-type':'application/json'},})
        const result = await response.json()
        if(result.success){
            toast.success(result.message)
        }
        else{
            toast.error(result.message)
        }
      setUser(null);
      Navigate("/");
    } catch (error) {
        toast.error(error.message)
    }
  };
  useEffect(() => {
    if (searchQuery.length > 1) {
      Navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-40 transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img
          className="h-9"
          src="unikart.jpg"
          alt="unikart"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className=" hidden sm:flex items-center gap-8">
        
        <NavLink
  to="/"
  className={({ isActive }) =>
    `hover:text-blue-600 transition ${
      isActive ? "text-blue-600 font-medium" : "text-gray-700"
    }`
  }
>
  Home
</NavLink>

<NavLink
  to="/products"
  className={({ isActive }) =>
    `hover:text-blue-600 transition ${
      isActive ? "text-blue-600 font-medium" : "text-gray-700"
    }`
  }
>
  All products
</NavLink>

<NavLink
  to="/add-address"
  className={({ isActive }) =>
    `hover:text-blue-600 transition ${
      isActive ? "text-blue-600 font-medium" : "text-gray-700"
    }`
  }
>
  Contacts
</NavLink>


        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              clip-rule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div
          onClick={() => Navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src='/cart.png' alt='cart' className="h-5"/>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => {
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src="/profile.png" className="w-10" alt="profile" />
            <ul className="hidden group-hover:block absolute bg-white shadow border border-gray-200 top-10 right-0 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                className="p-1.5 pl-3 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => Navigate("my-orders")}
              >
                My orders
              </li>
              <li className="p-1.5 pl-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={logout}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => Navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src='/cart.png' alt='cart' className="h-5"/>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
        
          <NavLink
  to="/"
  onClick={() => setOpen(false)}
  className="hover:text-blue-600 transition-colors"
>
  Home
</NavLink>
<NavLink
  to="/products"
  onClick={() => setOpen(false)}
  className="hover:text-blue-600 transition-colors"
>
  All products
</NavLink>
{user && (
  <NavLink
    to="/myorders"
    onClick={() => setOpen(false)}
    className="hover:text-blue-600 transition-colors"
  >
    My orders
  </NavLink>
)}
<NavLink
  to="/add-address"
  onClick={() => setOpen(false)}
  className="hover:text-blue-600 transition-colors"
>
  Contacts
</NavLink>


{!user ? (
  <button
    onClick={() => {
      setOpen(false);
      setShowUserLogin(true);
    }}
    className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition text-white rounded-full text-sm transition-transform"
  >
    Login
  </button>
) : (
  <button
    onClick={logout}
    className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition text-white rounded-full text-sm transition-transform"
  >
    Log out
  </button>
)}
        </div>
      )}
    </nav>
  );
}
