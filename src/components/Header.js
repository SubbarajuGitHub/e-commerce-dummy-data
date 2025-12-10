import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { FiSun, FiMoon, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import '../styles/header.css';

export default function Header({ onMenuClick, isMenuOpen }) {
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle menu">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        
        <Link to="/" className="logo">
          <h1>Mobile Accessories</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          {user ? (
            <>
              <Link to="/wishlist" className="nav-link">Wishlist</Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          <Link to="/cart" className="cart-icon-wrapper">
            <FiShoppingCart />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>

          {user && (
            <Link to="/wishlist" className="wishlist-icon-wrapper">
              <FiHeart />
              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </Link>
          )}

          {user ? (
            <div className="user-menu-wrapper">
              <button
                className="user-icon-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="User menu"
              >
                <FiUser />
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user.username}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" onClick={() => setShowUserMenu(false)}>
                    Orders
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
