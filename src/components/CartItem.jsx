import React, { useContext } from 'react';
import { Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { convertToINR } from '../utils/price';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
      {/* Product Image - Basic Setup */}
      <div className="w-16 h-16 bg-gray-50 border rounded flex items-center justify-center p-2 flex-shrink-0">
        <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
      </div>

      {/* Info and Quantity Controls */}
      <div className="flex-grow min-w-0">
        <h4 className="text-gray-700 font-medium truncate text-sm mb-2" title={item.title}>
          {item.title}
        </h4>
        
        <div className="flex items-center gap-4">
          {/* Simple quantity toggle */}
          <div className="flex items-center border rounded overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-xs disabled:opacity-30"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-3 text-xs font-bold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-xs"
            >
              +
            </button>
          </div>
          
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-300 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Item total price */}
      <div className="text-right">
        <p className="font-bold text-gray-900 text-sm">
          ₹{convertToINR(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
