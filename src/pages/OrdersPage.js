import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi';
import '../styles/orders.css';

export default function OrdersPage() {
  const { user, orders } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <FiPackage className="empty-icon" />
            <p>No orders yet</p>
            <p className="empty-subtitle">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">
                      <FiCalendar />
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="order-total">
                    <FiDollarSign />
                    ₹{order.total}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="order-item-info">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <p className="order-item-price">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="order-shipping">
                  <p><strong>Shipping Address:</strong></p>
                  <p>{order.shippingAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

