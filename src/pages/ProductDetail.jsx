import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { convertToINR } from '../utils/price';
import Loading from '../components/Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Fetching the specific product details by id
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Simple feedback when adding to cart
  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  if (loading) return <Loading />;

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 mb-4">Product not found.</p>
        <Link to="/" className="text-blue-600 text-sm font-bold">Back to Store</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="text-gray-400 hover:text-blue-600 mb-8 inline-block text-xs font-bold uppercase transition-colors">
        ← Back to all products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-8">
        {/* Simple image display */}
        <div className="bg-gray-50 border p-8 flex items-center justify-center min-h-[400px]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Product text and purchase action */}
        <div className="flex flex-col">
          <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>

          <div className="text-gray-400 text-sm mb-8">
            Rating: {product.rating?.rate} ({product.rating?.count} reviews)
          </div>

          <p className="text-gray-500 leading-relaxed text-sm mb-10 pb-10 border-b">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{convertToINR(product.price)}
            </span>
            
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`px-8 py-3 rounded font-bold text-sm transition-colors border ${
                isAdded 
                ? 'bg-green-50 text-green-600 border-green-100' 
                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
              }`}
            >
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
