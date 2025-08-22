import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // 5-second timer

  useEffect(() => {
    if (countdown === 0) {
      navigate('/'); // redirect to home
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-[#EFEEDF] font-arsenal">
      {/* Header */}
      <header className="bg-[#B8C6A0] text-center py-4 shadow-md">
        <h1 className="text-3xl font-bold font-arsenal text-white">Rise To Perfection</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <p className="text-gray-600">
          Redirecting you back to the homepage in <span className="font-bold">{countdown}</span> seconds...
        </p>
      </main>
    </div>
  );
}

export default Success;
