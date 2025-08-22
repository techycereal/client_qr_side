import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";
import CheckoutButton from "./Cart";
import ItemDisplay from "./ItemDisplay";

function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        setData(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // stop loading after fetch
      }
    };
    fetchData();
  }, []);

  const addToCart = (id) => {
    const product = data.find((item) => item.id === id);
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          { id, name: product.name, price: product.price, quantity: 1 },
        ];
      }
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#EFEEDF] font-arsenal">
      {/* Header */}
      <header className="bg-[#B8C6A0] text-center py-4 shadow-md">
        <h1 className="text-3xl font-bold font-arsenal text-white">Rise To Perfection</h1>
      </header>

      {/* Main content */}
      <main className="p-6 flex flex-col items-center">
        {loading ? (
          // Loading spinner
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-[#B8C6A0] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700 text-lg">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {data.map((item) => (
                <ItemDisplay data={item} addToCart={addToCart} key={item.id} />
              ))}
            </div>

            {/* Cart */}
            <div className="bg-[#939168] text-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Cart</h2>
              {cart.length > 0 ? (
                <ul className="space-y-2">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <div className="flex gap-2">
                        <span>${item.price * item.quantity}</span>
                        <button
                          onClick={() =>
                            setCart((prev) => prev.filter((i) => i.id !== item.id))
                          }
                          className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full"
                        >
                          -
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-200">Cart is empty</p>
              )}
              <h3 className="text-xl font-bold mt-4">Total: ${totalPrice}</h3>
              <div className="mt-4">
                <CheckoutButton cart={cart} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
