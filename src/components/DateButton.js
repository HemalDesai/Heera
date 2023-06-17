// DateButton.js
import React from 'react';

const DateButton = ({ label, onClick }) => {
  return (
    <button onClick={onClick} style={{backgroundColor:"#333", color:"whitesmoke", width:"100px", padding:"5px"}}>{label}</button>
  );
};

export default DateButton;
