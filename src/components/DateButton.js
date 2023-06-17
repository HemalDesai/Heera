// DateButton.js
import React from 'react';

const DateButton = ({ label, onClick }) => {
  return (
    <button onClick={onClick} style={{backgroundColor:"#333", color:"whitesmoke", width:"100px", padding:"5px",border: '1px solid #ccc',
    boxShadow: '0 5px 5px rgba(0,0,0,0.1)',
    // add border radius
    borderRadius: '10px',}}>{label}</button>
  );
};

export default DateButton;
