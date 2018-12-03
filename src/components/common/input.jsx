import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        className="form-control"
        autoFocus
        id={name}
        name={name}
        placeholder={`Enter ${name}`}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error} </div>}
    </div>
  );
}

export default Input;