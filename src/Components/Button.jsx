// Updated Button.jsx with margin support
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  padding = null,
  margin = null, // New: margin prop for spacing
  onClick, 
  disabled = false, 
  loading = false,
  fullWidth = false,
  type = 'button',
  startIcon,
  endIcon,
  className = '',
  ...props 
}) => {
  // Combine padding and margin styles
  const buttonStyle = {};
  if (padding) buttonStyle.padding = padding;
  if (margin) buttonStyle.margin = margin;
  
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full-width' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      style={Object.keys(buttonStyle).length > 0 ? buttonStyle : undefined}
      {...props}
    >
      {loading && (
        <span className="btn__spinner">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
        </span>
      )}
      
      {startIcon && !loading && <span className="btn__icon btn__icon--start">{startIcon}</span>}
      
      <span className="btn__content">{children}</span>
      
      {endIcon && !loading && <span className="btn__icon btn__icon--end">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  padding: PropTypes.string,
  margin: PropTypes.string, // New: margin prop
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Button;