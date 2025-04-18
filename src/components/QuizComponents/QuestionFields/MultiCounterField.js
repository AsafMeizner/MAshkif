import React, { useState, useEffect, useCallback } from 'react';

const MultiCounterField = ({ field, onChange, value }) => {
  const getInitialCounts = useCallback(() =>
    field.subFields.reduce((acc, subField) => {
      acc[subField.code] = value?.[subField.code] ?? subField.defaultValue ?? 0;
      return acc;
    }, {}), [value, field.subFields]
  );

  const [counts, setCounts] = useState(getInitialCounts());

  useEffect(() => {
    setCounts(getInitialCounts());
  }, [getInitialCounts]);

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