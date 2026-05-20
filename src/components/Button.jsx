import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  loading = false,
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default Button;
