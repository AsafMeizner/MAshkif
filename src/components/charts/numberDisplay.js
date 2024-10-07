import React from 'react';
import { ResponsiveContainer } from 'recharts'; 

const NumberDisplay = ({ config }) => {
  const defaultConfig = {
    color: '#00acc1',
    title: '',
    min: 0,
    max: 100,
    value: 50,
  };

  const finalConfig = { ...defaultConfig, ...config };
  const { color, title, min, max, value } = finalConfig;

  const percentage = ((value - min) / (max - min)) * 100;

  const circleStyle = {
    strokeDasharray: `${percentage} 100`,
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#ffffff' }}>
      {title && <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: "ffffff" }}>{title}</h3>}
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: '100%', height: '100%' }}>
          <path
            className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            strokeWidth="2"
          />
          <path
            className="circle"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            style={circleStyle}
          />
          <text x="18" y="20.35" className="percentage" textAnchor="middle" fill="#ffffff" fontSize="0.5rem">
            {`${value}/${max}`}
          </text>
        </svg>
      </ResponsiveContainer>
    </div>
  );
};

export default NumberDisplay;
