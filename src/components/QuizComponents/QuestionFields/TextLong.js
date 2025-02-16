import React from 'react';

const TextLongField = ({ field, onChange, value }) => {
  return (
    <div className="field">
      <label>{field.title}</label>
      <textarea
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows="10"
      />
    </div>
  );
};

export default TextLongField;