import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Page, Block } from "konsta/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ProductsPage = ({ bakeryAdminId, navigateBack }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false); // New state for showing order summary
  const [specialRequest, setSpecialRequest] = useState(""); // State for special request

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!bakeryAdminId) {
          setError("No Bakery Admin ID provided.");
          setLoading(false);
          return;
        }

        const productsQuery = query(
          collection(db, "products"),
          where("ownerId", "==", bakeryAdminId)
        );

        const querySnapshot = await getDocs(productsQuery);

        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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

  const handleAddToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = products.reduce(
    (total, product) => total + (product.price * (cart[product.id] || 0)),
    0
  );

  const handleOrderSubmit = () => {
    // Handle order submission logic here (e.g., send to Firestore or backend)
    alert("Order submitted!");
  };

  const handleShowOrderSummary = () => {
    setShowOrderSummary(true);
  };

  if (loading) {
    return (
      <Page className="bg-[#F4F6FF] relative">
        <Block className="text-center mt-20">
          <p className="text-[#FFC1C1] font-semibold">Loading Products...</p>
        </Block>
      </Page>
    );
  }

  if (error) {
    return (
      <Page className="bg-[#F4F6FF] relative">
        <Block className="text-center mt-20">
          <p className="text-[#FFC1C1] font-semibold">{error}</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page className="bg-[#F4F6FF] relative">
      {/* Back Icon Button */}
      <button
        onClick={navigateBack}
        className="absolute top-4 left-4 p-2 rounded-full bg-[#FFD1D1] hover:bg-[#FFB8D2] shadow-md"
      >
        <AiOutlineArrowLeft className="h-6 w-6 text-white" />
      </button>

      <Block className="rounded-lg shadow-lg mx-4 p-6">
        <h1 className="text-2xl font-bold text-[#FFB8D2] text-center mb-8">
          Products
        </h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
                style={{ maxWidth: "120px", margin: "auto" }}
              >
                {/* Product Image */}
                <div className="relative">
                  {cart[product.id] > 0 && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs rounded-full px-1">
                      {cart[product.id]}
                    </span>
                  )}
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="w-full h-24 object-cover"
                    />
                  )}
                </div>
                <div className="p-2 text-center">
                  {/* Product Name */}
                  <h2 className="text-xs font-semibold text-[#FFB8D2] mb-1">
                    {product.productName}
                  </h2>
                  {/* Product Price */}
                  <p className="text-gray-700 text-xs font-medium">
                    ${product.price}
                  </p>
                  {/* Add/Remove Buttons */}
                  {cart[product.id] > 0 ? (
                    <div className="flex items-center justify-center mt-1">
                      <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-l"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 bg-gray-100 text-xs">
                        {cart[product.id]}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-r"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="mt-1 px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#FFDDEB]">No products found.</p>
        )}
      </Block>

      {/* View Order Button */}
      {cartItemCount > 0 && (
        <div
          className="fixed bottom-0 left-0 px-4 py-2 rounded-lg bg-green-500 text-center"
          onClick={handleShowOrderSummary}
        >
          <button className="text-white font-bold text-lg">
            View Order ({cartItemCount})
          </button>
        </div>
      )}

      {/* Order Summary Modal */}
      {showOrderSummary && (
  <div
    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    onClick={(e) => {
      // Close modal if clicked on the overlay (not the modal itself)
      if (e.target === e.currentTarget) {
        setShowOrderSummary(false);
      }
    }}
  >
    <div className="bg-white text-black p-6 rounded-lg w-full sm:w-96 relative">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setShowOrderSummary(false)}
      >
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4">Your Order</h2>
      {Object.keys(cart).map((productId) => {
        const product = products.find((p) => p.id === productId);
        const quantity = cart[productId];
        return (
          <div key={productId} className="flex justify-between mb-2">
            <div>{product.productName} x{quantity}</div>
            <div>${(product.price * quantity).toFixed(2)}</div>
          </div>
        );
      })}
      <div className="my-4">
        <textarea
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          placeholder="Any special requests, details, final wishes etc."
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold">Total: ${totalPrice.toFixed(2)}</span>
        <button
          className="px-4 py-2 bg-green-500 text-white font-bold rounded"
          onClick={handleOrderSubmit}
        >
          PAY ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  </div>
)}

    </Page>
  );
};

export default ProductsPage;
