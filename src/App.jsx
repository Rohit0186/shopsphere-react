import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  // Lifting search state here so it can be shared between Navbar and Home
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
          {/* Navbar only handles the search input UI and badge display */}
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <main className="flex-grow container mx-auto px-4 py-12">
            <Routes>
              {/* Home handles the product list and search logic */}
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          <footer className="bg-white border-t py-6 text-center text-gray-400 text-xs">
            <p>&copy; {new Date().getFullYear()} ShopSphere. Built for a professional portfolio.</p>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
