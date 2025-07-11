import React from "react";
import { useAppContext } from "../../context/AppContext";
import BASE_URL from "../../../config";
import toast from "react-hot-toast";

export const ProductList = () => {
  const { currency, products } = useAppContext();

  const togglingStock = async (id, inStock) => {
    try {
      const response = await fetch(`${BASE_URL}/product/stock`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id, inStock }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-block w-12 h-7 cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() =>
                          togglingStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                        className="sr-only peer"
                      />
                      <div className="w-full h-full bg-slate-300 peer-checked:bg-blue-600 rounded-full transition-colors duration-300"></div>
                      <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
