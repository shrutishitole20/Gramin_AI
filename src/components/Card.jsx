import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  icon, 
  className = '', 
  animate = true,
  variant = 'glass' 
}) => {
  return (
    <div className={`card ${variant === 'glass' ? 'glass-card' : 'standard-card'} ${animate ? 'animate-fade-in' : ''} ${className}`}>
      {icon && <div className="card-icon">{icon}</div>}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Card;
