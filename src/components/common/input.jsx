import React from 'react';

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        className="form-control"
        autoFocus
        id={name}
        name={name}
        placeholder="Enter username"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;