import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import '../styles/product-modal.css';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <div className="product-placeholder-large">
              {product.name.charAt(0)}
            </div>
          </div>

          <div className="modal-info">
            <h2>{product.name}</h2>
            <p className="modal-category">{product.category}</p>
            
            <div className="modal-rating">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={i < product.rating ? 'star-filled' : 'star-empty'}
                />
              ))}
              <span>({product.rating} rating)</span>
            </div>

            <div className="modal-price">₹{product.price}</div>

            <div className="modal-description">
              <p>
                Premium quality {product.category.toLowerCase()} designed for your mobile devices. 
                This product offers excellent performance and durability.
              </p>
            </div>

            <div className="modal-actions">
              <motion.button
                className="modal-cart-button"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShoppingCart />
                Add to Cart
              </motion.button>

              <motion.button
                className={`modal-wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Add to wishlist"
              >
                <FiHeart />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

