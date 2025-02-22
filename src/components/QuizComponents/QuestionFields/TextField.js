import React from 'react';

const TextField = ({ field, onChange, value }) => {
  const isHebrew = (text) => /[\u0591-\u05F4]/.test(text);

  return (
    <div className="field">
      <label>{field.title}</label>
      <input
        type="text"
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ direction: isHebrew(value) ? 'rtl' : 'ltr' }}
      />
    </div>
  );
};

export default TextField;
