import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductModal from '../components/ProductModal';
import { FiShoppingCart, FiStar, FiSearch, FiHeart, FiFilter, FiX } from 'react-icons/fi';
import '../styles/home.css';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const categories = ['All Categories', 'Earphones', 'Chargers', 'Cables', 'Smart Watches'];

  let filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (cat ? p.category === cat : true) &&
      p.price >= priceRange.min &&
      p.price <= priceRange.max
  );

  // Sort products
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Premium Mobile Accessories</h1>
        <p>Discover the best accessories for your mobile devices</p>
      </div>

      <div className="home-filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="category-chips">
            {categories.map((category) => {
              const categoryValue = category === 'All Categories' ? '' : category;
              const isActive = cat === categoryValue;
              return (
                <motion.button
                  key={category}
                  className={`category-chip ${isActive ? 'active' : ''}`}
                  onClick={() => setCat(categoryValue)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              );
            })}
          </div>

          <div className="sort-price-controls">
            <div className="sort-select-wrapper">
              <FiFilter className="filter-icon" />
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            <div className="price-range">
              <label>Price Range: ₹{priceRange.min} - ₹{priceRange.max}</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 50000 })}
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="products-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.length === 0 ? (
          <div className="no-products">
            <p>No products found. Try a different search or filter.</p>
          </div>
        ) : (
          filtered.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="product-image">
                <div className="product-placeholder">
                  {product.name.charAt(0)}
                </div>
                <motion.button
                  className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={(e) => handleWishlistToggle(product, e)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Add to wishlist"
                >
                  <FiHeart />
                </motion.button>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < product.rating ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                  <span>({product.rating})</span>
                </div>
                <p className="product-price">₹{product.price}</p>
                <div className="product-actions">
                  <motion.button
                    className="add-to-cart-button"
                    onClick={(e) => handleAddToCart(product, e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    className="quick-view-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Quick View
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
