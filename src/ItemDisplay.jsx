import React from "react";

function ItemDisplay({data, addToCart}) {
  return (
    <div className="max-w-sm w-full md:max-w-md lg:max-w-lg p-4">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Image */}
        <div className="md:w-1/3 w-full">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="h-48 w-full object-cover md:h-full"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between md:w-2/3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
            <p className="text-gray-600">${data.price}</p>
          </div>

          {/* Ingredients */}
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-700">Ingredients:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {Array.isArray(data.ingredients) ? (
                data.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))
              ) : (
                <li>{data.ingredients}</li>
              )}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(data.id)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDisplay;
