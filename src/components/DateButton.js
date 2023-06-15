// DateButton.js
import React from 'react';

const DateButton = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
};

export default DateButton;
