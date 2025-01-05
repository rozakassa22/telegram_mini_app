import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Page, Block } from "konsta/react";

const ProductsPage = ({ bakeryAdminId, navigateBack }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Validate bakeryAdminId
        if (!bakeryAdminId) {
          setError("No Bakery Admin ID provided.");
          setLoading(false);
          return;
        }

        console.log("Fetching products for Bakery Admin ID:", bakeryAdminId);

        // Query products based on ownerId
        const productsQuery = query(
          collection(db, "products"),
          where("ownerId", "==", bakeryAdminId) // Match products by ownerId
        );

        const querySnapshot = await getDocs(productsQuery);

        // Check if no products are found
        if (querySnapshot.empty) {
          console.warn(`No products found for Bakery Admin ID: ${bakeryAdminId}`);
        }

        // Map query results to products state
        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Products:", productData);
        setProducts(productData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [bakeryAdminId]);

  if (loading) {
    return (
      <Page className="bg-[#F4F6FF]">
        <Block className="text-center mt-20">
          <p className="text-[#FFC1C1] font-semibold">Loading Products...</p>
        </Block>
      </Page>
    );
  }

  if (error) {
    return (
      <Page className="bg-[#F4F6FF]">
        <Block className="text-center mt-20">
          <p className="text-[#FFC1C1] font-semibold">{error}</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page className="bg-[#F4F6FF]">
      <Block className="rounded-lg shadow-lg mx-4 p-6">
        <h1 className="text-2xl font-bold text-[#FFB8D2] text-center mb-8">
          Products
        </h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Product Image */}
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 text-center">
                  {/* Product Name */}
                  <h2 className="text-lg font-semibold text-[#FFB8D2] mb-2">
                    {product.productName}
                  </h2>
                  {/* Product Price */}
                  <p className="text-gray-700 font-medium">Price: ${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#FFDDEB]">No products found.</p>
        )}
        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={navigateBack}
            className="px-4 py-2 bg-[#FFD1D1] text-white font-bold rounded-lg shadow-md hover:bg-[#FFB8D2]"
          >
            Back to Bakery Admins
          </button>
        </div>
      </Block>
    </Page>
  );
};

export default ProductsPage;
