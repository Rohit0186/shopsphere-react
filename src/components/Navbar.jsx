import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Simple item count logic for the cart badge
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Update search and ensure we are on the home page to see results
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 py-3 sm:py-4">
      <div className="container mx-auto px-4 flex items-center justify-between gap-3 sm:gap-6">
        {/* Simple Shop Branding */}
        <Link to="/" className="text-blue-600 font-bold text-lg sm:text-xl tracking-tight flex-shrink-0">
          ShopSphere
        </Link>

        {/* Search Input - Improved alignment and responsiveness */}
        <div className="flex-1 max-w-[200px] sm:max-w-sm relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border border-gray-100 rounded px-3 py-1.5 sm:py-2 pl-9 sm:pl-10 focus:outline-none focus:border-blue-400 text-xs sm:text-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Using top-1/2 transform to ensure vertical centering regardless of height */}
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            size={16}
          />
        </div>

        {/* Cart Link with a basic badge */}
        <div className="flex-shrink-0">
          <Link to="/cart" className="relative p-1 text-gray-500 hover:text-blue-600 transition flex items-center">
            <ShoppingCart size={20} className="sm:w-[22px] sm:h-[22px]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] sm:text-[10px] h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
