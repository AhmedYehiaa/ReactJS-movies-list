import React from 'react';

const Input = ({ name, label, error, ...rest }) => {

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        className="form-control"
        autoFocus
        id={name}
        name={name}
        placeholder={`Enter ${name}`}
      />
      {error && <div className="alert alert-danger">{error} </div>}
    </div>
  );
}

export default Input;