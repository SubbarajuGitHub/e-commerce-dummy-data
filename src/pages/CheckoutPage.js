import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import '../styles/checkout.css';

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.username || '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const orderData = {
      items: cartItems,
      total: getTotalPrice(),
      shippingAddress: form.address,
      phone: form.phone,
      customerName: form.name,
    };

    setTimeout(() => {
      addOrder(orderData);
      clearCart();
      setLoading(false);
      alert('Order placed successfully!');
      navigate('/orders');
    }, 1000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Checkout</h2>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <h3>Shipping Information</h3>
            <form className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Shipping Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Enter your complete address"
                />
              </div>
            </form>

            <div className="order-items-preview">
              <h3>Order Items</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="preview-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
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
            </div>

            <motion.button
              className="place-order-button"
              onClick={placeOrder}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
