import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching products from the store api
  // We handle loading and errors manually to keep it clear
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('API fetch failed');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Could not load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Simple string filter for the search functionality
  // It checks if the title contains the search term (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  // Displaying error state if something went wrong
  if (error) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-gray-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-blue-600 font-bold hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
        All Products
      </h1>

      {/* Grid for products - simple columns setup */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dotted">
          <p className="text-gray-400">No products match your search.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
