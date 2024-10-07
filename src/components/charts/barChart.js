import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, LabelList
} from 'recharts';

const CustomBarShape = (props) => {
  const {
    fill,
    x,
    y,
    width,
    height,
    stroke,
    strokeWidth,
    strokeDasharray,
    borderRadius,
    opacity,
    gradient,
  } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={gradient ? `url(#${gradient})` : fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      rx={borderRadius}
      opacity={opacity}
    />
  );
};

const BarGraph = ({ config }) => {
  const defaultConfig = {
    data: [],
    scoringTypes: [],
    chartSettings: {
      outline: true,
      borderRadius: 4,
      opacity: 1,
      outlineColor: '#ffffff',
      outlineWidth: 1,
      showGridlines: true,
      gridlineColor: '#444444',
    },
    xKey: 'teamNumber',
    yKey: 'averageScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Score',
    yAxisMin: 'auto',
    yAxisMax: 'auto',
    showTooltip: true,
    tooltipSettings: {
      backgroundColor: '#333333',
      borderRadius: '10px',
      fontSize: '0.875rem',
      cursorColor: 'rgba(255, 255, 255, 0.1)',
    },
    showLegend: true,
    interactiveLegend: true,
    legendPosition: 'top',
    responsive: true,
    maintainAspectRatio: false,
    showDataLabels: false,
    dataLabelPosition: 'top',
    dataLabelRotation: 0,
    gradientFills: {},
    xAxisLabelRotation: -90,
    thresholdLines: [],
    sortDataBy: 'yKey', 
    width: 800,
    height: 500,
    title: 'Title',
    sortOrder: 'descending',
    fontSettings: {
      titleFontSize: '1.5rem',
      axisLabelFontSize: '1.125rem',
      axisTickFontSize: '1rem',
      legendFontSize: '1rem',
      dataLabelFontSize: '1rem',
      tooltipFontSize: '0.875rem',
      annotationFontSize: '1rem',
      defaultLabelColor: '#ffffff',
    },
    margin: { top: 20, right: 20, left: 20, bottom: 120 },
  };

  const finalConfig = { ...defaultConfig, ...config };

  const {
    data,
    scoringTypes,
    chartSettings,
    xKey,
    yKey,
    xAxisLabel,
    yAxisLabel,
    yAxisMin,
    yAxisMax,
    showLegend,
    legendPosition,
    width,
    height,
    title,
    fontSettings,
    tooltipSettings,
    showTooltip,
    margin,
    interactiveLegend,
    responsive,
    maintainAspectRatio,
    showDataLabels,
    dataLabelPosition,
    dataLabelRotation,
    gradientFills,
    xAxisLabelRotation,
    sortDataBy,  
    sortOrder,
  } = finalConfig;

  try {
    const sortKey = sortDataBy === 'xKey' ? xKey : yKey;
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a[sortKey] - b[sortKey]; 
      } else {
        return b[sortKey] - a[sortKey];  
      }
    });

  return (
    <div style={{ width: responsive ? '100%' : width, height: responsive ? '100%' : height }}>
      {title && <h2 style={{ fontSize: fontSettings.titleFontSize, textAlign: 'center', marginBottom: 20, color: '#ffffff' }}>{title}</h2>}
      <ResponsiveContainer width="100%" height="100%" aspect={maintainAspectRatio ? 2 : 1}>
        <BarChart
          data={sortedData}
          margin={margin}
        >
          {chartSettings.showGridlines && (
            <CartesianGrid stroke={chartSettings.gridlineColor} />
          )}
          <XAxis
            dataKey={xKey} 
            angle={xAxisLabelRotation || 0}
            textAnchor={xAxisLabelRotation ? 'end' : 'middle'}
            interval={0}
            tick={{ fontSize: fontSettings.axisTickFontSize, fill: fontSettings.defaultLabelColor }}
          >
            <Label value={xAxisLabel} offset={-40} position="insideBottom" fontSize={fontSettings.axisLabelFontSize} fill={fontSettings.defaultLabelColor} />
          </XAxis>
          <YAxis domain={[yAxisMin, yAxisMax]}>
            <Label value={yAxisLabel} angle={-90} position="insideLeft" fontSize={fontSettings.axisLabelFontSize} fill={fontSettings.defaultLabelColor} />
          </YAxis>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipSettings.backgroundColor,
                borderRadius: tooltipSettings.borderRadius,
                fontSize: tooltipSettings.fontSize,
                color: '#ffffff',
              }}
              cursor={{ fill: tooltipSettings.cursorColor }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign={legendPosition}
              wrapperStyle={{ fontSize: fontSettings.legendFontSize, color: '#ffffff' }}
            />
          )}
          {scoringTypes.map((type, index) => (
            <Bar
              key={type.key}
              dataKey={type.key}
              fill={type.color}
              name={type.name}  
              shape={<CustomBarShape />}
              stackId={type.stacked ? 'a' : undefined}  
            >
              {showDataLabels && (
                <LabelList 
                  dataKey={yKey} 
                  position={dataLabelPosition} 
                  angle={dataLabelRotation}
                  fill={fontSettings.defaultLabelColor} 
                  fontSize={fontSettings.dataLabelFontSize}
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  } catch (error) {
    console.error(`Error sorting data by ${sortDataBy}:`, error);
  }
};

export default BarGraph;
