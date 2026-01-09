import React from 'react';

const TextLongField = ({ field, onChange, value }) => {
  const isHebrew = (text) => /[\u0591-\u05F4]/.test(text);

  return (
    <div className="field">
      <label>{field.title}</label>
      <textarea
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows="10"
        style={{ direction: isHebrew(value) ? 'rtl' : 'ltr' }}
      />
    </div>
  );
};

export default TextLongField;