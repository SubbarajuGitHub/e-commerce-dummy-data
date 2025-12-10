import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiX,
  FiHeart,
} from 'react-icons/fi';
import '../styles/sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={onClose}>
            <FiHome />
            <span>Home</span>
          </Link>

          <Link to="/cart" className="sidebar-link" onClick={onClose}>
            <FiShoppingCart />
            <span>Cart</span>
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="sidebar-link" onClick={onClose}>
                <FiPackage />
                <span>My Orders</span>
              </Link>
              <Link to="/wishlist" className="sidebar-link" onClick={onClose}>
                <FiHeart />
                <span>Wishlist</span>
              </Link>
              <Link to="/profile" className="sidebar-link" onClick={onClose}>
                <FiUser />
                <span>Profile</span>
              </Link>
              <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
                <FiX />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="sidebar-link" onClick={onClose}>
                <FiLogIn />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="sidebar-link" onClick={onClose}>
                <FiUserPlus />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
