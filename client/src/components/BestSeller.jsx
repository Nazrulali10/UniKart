
import { useAppContext } from "../context/appContext";
import ProductCard from "./ProductCard";



export const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols:4 lg:grid-cols-5 mt-6 sm:gap-4 gap-8">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};
