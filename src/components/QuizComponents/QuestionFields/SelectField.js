import React from 'react';

const SelectField = ({ field, onChange, value }) => {
  return (
    <div className="field">
      <label>{field.title}</label>
      <select
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(field.choices).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
