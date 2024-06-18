import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        // const response = await axios.get(`http://localhost:9000/api/products`);

        console.log("API Response:", response.data);
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <div key={product._id} className="p-4 lg:w-1/4 md:w-1/2">
              <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-sm text-gray-700">
                    {truncateText(product.description, 100)}
                  </p>
                </div>
                <div className={`flex items-center justify-between px-6 ${product.description.length > 100 ? 'pb-4' : ''}`}>
                  <span className="text-lg font-medium text-gray-900">${product.price}</span>
                  <div>
                    <a
                      href={`/detail/${product._id}`}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
