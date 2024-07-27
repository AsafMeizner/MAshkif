import React from 'react';

const NumberField = ({ field, onChange }) => {
  return (
    <div className="field">
      <label>{field.title}</label>
      <input
        type="number"
        required={field.required}
        onChange={(e) => onChange(field.code, e.target.value)}
      />
    </div>
  );
};

export default NumberField;
