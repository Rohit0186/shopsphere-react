import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { convertToINR } from '../utils/price';
import { ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);

  // Totalling up the prices from our cart array
  const total = cart.reduce((acc, item) => acc + convertToINR(item.price) * item.quantity, 0);

  // Show this if there is nothing in the cart
  if (cart.length === 0) {
    return (
      <div className="text-center py-20 px-4 max-w-sm mx-auto">
        <div className="bg-gray-50 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="text-gray-300" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Cart is empty</h2>
        <p className="text-gray-500 mb-8 text-sm">You haven't added any products yet.</p>
        <Link
          to="/"
          className="block w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition text-sm"
        >
          Find Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-xs font-medium transition-colors"
        >
          <Trash2 size={14} />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* The list of items in the cart */}
        <div className="md:col-span-2">
          <div className="divide-y divide-gray-50">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Simple order summary box */}
        <div className="md:col-span-1">
          <div className="bg-white border p-6 rounded shadow-sm sticky top-28">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Summary</h3>
            
            <div className="space-y-4 mb-8 border-b pb-6">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Items count</span>
                <span className="text-gray-900 font-medium">{cart.length}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping fee</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-10">
              <span className="font-bold text-gray-700">Total</span>
              <span className="text-2xl font-black text-gray-900">₹{total}</span>
            </div>

            <button
              onClick={() => alert('Order simulation successful')}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition text-sm"
            >
              Checkout
            </button>
            
            <Link to="/" className="block text-center mt-6 text-gray-400 hover:text-blue-500 text-xs font-medium">
              Keep Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
