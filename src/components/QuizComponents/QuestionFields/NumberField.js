import React from 'react';

const NumberField = ({ field, onChange, value }) => {
  return (
    <div className="field">
      <label>{field.title}</label>
      <input
        type="number"
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default NumberField;
