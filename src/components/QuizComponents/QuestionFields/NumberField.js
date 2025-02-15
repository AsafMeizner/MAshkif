import React from 'react';

const NumberField = ({ field, onChange, value, valueAsNumber }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(valueAsNumber ? Number(inputValue) : inputValue);
  };

  return (
    <div className="field">
      <label>{field.title}</label>
      <input
        type="number"
        required={field.required}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberField;