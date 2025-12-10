import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import '../styles/cart.css';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const { user } = useAuth();
  const itemRefs = useRef({});

  useEffect(() => {
    cartItems.forEach((item) => {
      if (itemRefs.current[item.id]) {
        itemRefs.current[item.id].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    });
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <FiShoppingBag className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className="shop-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart ({getTotalItems()} items)</h2>

        <div className="cart-content">
          <div className="cart-items">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  ref={(el) => (itemRefs.current[item.id] = el)}
                  className="cart-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="cart-item-image">
                    <div className="cart-item-placeholder">
                      {item.name.charAt(0)}
                    </div>
                  </div>

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">₹{item.price} each</p>
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-button"
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-button"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <div className="cart-item-total">
                    <p>₹{item.price * item.quantity}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                    aria-label="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{getTotalPrice()}</span>
            </div>

            {user ? (
              <Link to="/checkout" className="checkout-button">
                Proceed to Checkout
              </Link>
            ) : (
              <div className="login-prompt">
                <p>Please login to checkout</p>
                <Link to="/login" className="login-link-button">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
