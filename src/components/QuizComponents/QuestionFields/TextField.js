import React from 'react';

const TextField = ({ field, onChange, value }) => {
  return (
    <div className="field">
      <label>{field.title}</label>
      <input
        type="text"
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextField;
