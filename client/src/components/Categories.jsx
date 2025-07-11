import React from "react";
import { categories } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";


export const Categories = () => {
  const {Navigate} = useAppContext()
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-col-2 sm:grid-cols-4 md:grid-col-5 lg:grid-col-6 xl:grid-col-7 mt-6 gap-6">
        {categories.map((categorie, index) => (
          <div onClick={()=>Navigate(`/products/${categorie.path.toLowerCase()}`)}
            key={index}
            className="group flex flex-col justify-center items-center py-5 px-3 cursor-pointer gap-2 rounded-lg" style={{backgroundColor:categorie.bgColor}}
          >
            <img className="max-w-28 max-h-30 rounded-md" src={categorie.image} alt={categorie.text} />
            <p>{categorie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
