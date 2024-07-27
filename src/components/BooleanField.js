import React from 'react';
import './BooleanField.css';

const BooleanField = ({ field, onChange }) => {
  return (
    <div className="field">
      <label className="toggle-label">{field.title}</label>
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={field.defaultValue}
          onChange={(e) => onChange(field.code, e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default BooleanField;
