import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

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
        <p className="text-gray-600 mb-6 text-center">
          We'll call your name when your order is ready, just listen for it!
        </p>

        {/* Button to go back */}
        <button
          onClick={() => navigate('/')}
          className="bg-[#B8C6A0] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#A5B38F] transition"
        >
          Back to Home
        </button>
      </main>
    </div>
  );
}

export default Success;
