import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { FiHeart, FiShoppingCart, FiTrash2, FiStar } from 'react-icons/fi';
import '../styles/wishlist.css';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-wishlist">
          <FiHeart className="empty-wishlist-icon" />
          <h2>Your wishlist is empty</h2>
          <p>Start adding products you love!</p>
          <Link to="/" className="shop-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h2>My Wishlist ({wishlist.length} items)</h2>

        <motion.div
          className="wishlist-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                className="wishlist-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="wishlist-item-image">
                  <div className="product-placeholder">
                    {product.name.charAt(0)}
                  </div>
                  <button
                    className="remove-wishlist-button"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="wishlist-item-info">
                  <h3>{product.name}</h3>
                  <p className="wishlist-item-category">{product.category}</p>
                  <div className="wishlist-item-rating">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < product.rating ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                    <span>({product.rating})</span>
                  </div>
                  <p className="wishlist-item-price">₹{product.price}</p>
                  <div className="wishlist-item-actions">
                    <motion.button
                      className="add-to-cart-from-wishlist"
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

