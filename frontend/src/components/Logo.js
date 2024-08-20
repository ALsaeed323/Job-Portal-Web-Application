import React from 'react';
import logo from '../assets/layout_set_logo 1.png'; // Adjust the path if necessary

const Logo = () => {
  return (
    <img 
    src={logo} 
    alt="Logo" 
    style={{ 
      height: '50px',  
      position: 'absolute', 
      right: '1490px' 
    }} 
  />
  
  );
};

export default Logo;
