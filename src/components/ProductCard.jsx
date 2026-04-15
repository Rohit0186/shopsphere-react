import React from 'react';
import { Link } from 'react-router-dom';
import { convertToINR } from '../utils/price';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-100 p-4 hover:border-gray-200 transition-colors flex flex-col h-full">
      {/* Product Image - Basic container */}
      <div className="h-48 flex items-center justify-center p-2 bg-gray-50 mb-4 transition-opacity hover:opacity-90">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product info - Basic text display */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-gray-700 font-medium text-sm line-clamp-2 min-h-[2.5rem] mb-4">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          {/* Using our price helper to show INR */}
          <span className="text-base font-bold text-gray-900">
            ₹{convertToINR(product.price)}
          </span>
          
          <Link
            to={`/product/${product.id}`}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
