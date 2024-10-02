import React from 'react';
import './BooleanField.css';

const BooleanField = ({ field, onChange, value }) => {
  return (
    <div className="field">
      <label className="toggle-label">{field.title}</label>
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default BooleanField;