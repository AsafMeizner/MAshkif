import React, { useState, useEffect } from 'react';

const MultiCounterField = ({ field, onChange, value }) => {
  // Helper to initialize counts from the prop value or subField defaults
  const getInitialCounts = () =>
    field.subFields.reduce((acc, subField) => {
      acc[subField.code] = value?.[subField.code] ?? subField.defaultValue ?? 0;
      return acc;
    }, {});

  const [counts, setCounts] = useState(getInitialCounts());

  // Update local state when the external value changes (e.g., on reset)
  useEffect(() => {
    setCounts(getInitialCounts());
  }, [value, field.subFields]);

  const increment = (code) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [code]: prevCounts[code] + 1 };
      onChange(newCounts);
      return newCounts;
    });
  };

  const decrement = (code) => {
    setCounts((prevCounts) => {
      const subField = field.subFields.find((sf) => sf.code === code);
      if (prevCounts[code] > subField.min) {
        const newCounts = { ...prevCounts, [code]: prevCounts[code] - 1 };
        onChange(newCounts);
        return newCounts;
      }
      return prevCounts;
    });
  };

  return (
    <div className="multi-counter-field">
      <label>{field.title}</label>
      <div className="multi-counter">
        {field.subFields.map((subField) => (
          <div key={subField.code} className="counter">
            <span>{subField.title}</span>
            <button type="button" onClick={() => increment(subField.code)}>
              +
            </button>
            <span>{counts[subField.code]}</span>
            <button type="button" onClick={() => decrement(subField.code)}>
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCounterField;
