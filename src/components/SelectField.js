import React from 'react';

const SelectField = ({ field, onChange }) => {
  return (
    <div className="field">
      <label>{field.title}</label>
      <select
        required={field.required}
        defaultValue={field.defaultValue}
        onChange={(e) => onChange(field.code, e.target.value)}
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
