import { loadStripe } from "@stripe/stripe-js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./lib/firebase"; // make sure this is your firestore init

const stripePromise = loadStripe(
  "pk_test_51RyOWF2LE82Zh4W3x9JYGxk89AH5ZDDyoTRmiUcu5NZyf2u103bu2bJSICn3I3HonNaFuUrYjxKNX9XuBj2j2ZIk00KkuxOtNK"
);

function CheckoutButton({ cart }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // 1. Get product data from Firestore for all items in the cart
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("__name__", "in", cart.map((item) => item.id))
    );
    const querySnapshot = await getDocs(q);

    // 2. Merge Firestore data (name, price) with cart (quantity)
    const products = querySnapshot.docs.map((doc) => {
      const productData = doc.data();
      const cartItem = cart.find((item) => item.id === doc.id);

      return {
        name: productData.name,
        price: productData.price,
        quantity: cartItem?.quantity || 1, // fallback just in case
      };
    });

    console.log("Checkout products:", products);

    // 3. Send full product data to backend
    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: products }),
    });

    const { id } = await res.json();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Pay Now
    </button>
  );
}

export default CheckoutButton;
