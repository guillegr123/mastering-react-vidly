import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        {options.items.map(item => (
          <option
            key={item[options.valueProperty]}
            value={item[options.valueProperty]}
          >
            {item[options.textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
