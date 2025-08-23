import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RyOWF2LE82Zh4W3x9JYGxk89AH5ZDDyoTRmiUcu5NZyf2u103bu2bJSICn3I3HonNaFuUrYjxKNX9XuBj2j2ZIk00KkuxOtNK"
);

function CheckoutButton({ cart }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const stripe = await stripePromise;

      const products = cart.map((item) => ({
  id: item.id,
  quantity: item.quantity,
}));

const res = await fetch(
  "https://qrserverrtp-ewcxg5hscaekacfs.eastus-01.azurewebsites.net/create-checkout-session",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: products }),
  }
);

      const { id } = await res.json();
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-[#EFEEDF] text-black px-4 py-2 rounded flex items-center justify-center disabled:opacity-50 min-w-[100px]"
      disabled={cart.length === 0 || loading}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
          <span className="sr-only">Processing...</span> {/* invisible text for screen readers */}
        </>
      ) : (
        "Pay Now"
      )}
    </button>
  );
}

export default CheckoutButton;
