import React from 'react';
import { ResponsiveContainer } from 'recharts';

const MultiNumberDisplay = ({ config }) => {
  const defaultConfig = {
    mainTitle: '', // New main title in config
    values: [
      {
        color: '#00acc1',
        title: 'Title',
        min: 0,
        max: 100,
        value: 50,
      },
    ],
  };

  const finalConfig = { ...defaultConfig, ...config };
  const { mainTitle, values } = finalConfig;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#ffffff' }}>
      {mainTitle && <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#ffffff' }}>{mainTitle}</h2>}
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {values.map((item, index) => {
          const { color, title, min, max, value } = item;
          const percentage = ((value - min) / (max - min)) * 100;
          const circleStyle = {
            strokeDasharray: `${percentage} 100`,
          };

          return (
            <div key={index} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
              {title && <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#ffffff' }}>{title}</h3>}
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
        })}
      </div>
    </div>
  );
};

export default MultiNumberDisplay;
