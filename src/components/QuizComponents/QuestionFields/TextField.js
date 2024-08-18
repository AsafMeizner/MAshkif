import React from 'react';

const TextField = ({ field, onChange }) => {
  return (
    <div className="field">
      <label>{field.title}</label>
      <input
        type="text"
        required={field.required}
        onChange={(e) => onChange(field.code, e.target.value)}
      />
    </div>
  );
};

export default TextField;
