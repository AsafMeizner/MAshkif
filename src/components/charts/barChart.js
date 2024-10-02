import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, Rectangle, Text,
  ReferenceLine, ReferenceDot,
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
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={gradient ? `url(#${gradient})` : fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      radius={borderRadius}
      fillOpacity={opacity}
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
    xKey: 'team',
    yKey: 'scores',
    xAxisLabel: 'X-Axis',
    yAxisLabel: 'Y-Axis',
    yAxisMin: 'auto',
    yAxisMax: 'auto',
    showTooltip: true,
    tooltipSettings: {
      backgroundColor: '#333333',
      borderRadius: '10px',
      fontSize: '14px',
      cursorColor: 'rgba(255, 255, 255, 0.1)',
    },
    showLegend: true,
    interactiveLegend: true,
    legendPosition: 'top',
    annotations: [],
    responsive: true,
    maintainAspectRatio: false,
    showDataLabels: true,
    dataLabelPosition: 'top',
    dataLabelRotation: 0,
    gradientFills: {},
    xAxisLabelRotation: 0,
    thresholdLines: [],
    sortDataBy: 'x',
    width: 800,
    height: 500,
    title: 'Bar Graph',
    fontSettings: {
      titleFontSize: 24,
      axisLabelFontSize: 18,
      axisTickFontSize: 16,
      legendFontSize: 16,
      dataLabelFontSize: 18,
      tooltipFontSize: 16,
      thresholdFontSize: 16,
      annotationFontSize: 16,
      defaultLabelColor: '#ffffff',
    },
    margin: { top: 20, right: 20, left: 20, bottom: 20 },
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
    annotations,
    responsive,
    maintainAspectRatio,
    showDataLabels,
    dataLabelPosition,
    dataLabelRotation,
    gradientFills,
    xAxisLabelRotation,
    thresholdLines,
    sortDataBy,
  } = finalConfig;

  const [visibleTypes, setVisibleTypes] = useState(scoringTypes.map(type => type.key));

  const handleLegendClick = (typeKey) => {
    if (interactiveLegend) {
      setVisibleTypes(prevState =>
        prevState.includes(typeKey)
          ? prevState.filter(key => key !== typeKey)
          : [...prevState, typeKey]
      );
    }
  };

  const sortedData = [...data].sort((a, b) => (sortDataBy === 'x' ? a[xKey] - b[xKey] : a[yKey] - b[yKey]));

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
            <Label value={xAxisLabel} offset={-10} position="insideBottom" fontSize={fontSettings.axisLabelFontSize} fill={fontSettings.defaultLabelColor} />
          </XAxis>
          <YAxis domain={[yAxisMin, yAxisMax]}>
            <Label value={yAxisLabel} angle={-90} position="insideLeft" fontSize={fontSettings.axisLabelFontSize} fill={fontSettings.defaultLabelColor} />
            <Text fontSize={fontSettings.axisTickFontSize} fill={fontSettings.defaultLabelColor} />
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
              wrapperStyle={{
                borderColor: '#ccc',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
              }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign={legendPosition}
              onClick={(e) => handleLegendClick(e.value)}
              payload={scoringTypes.map(type => ({
                id: type.key,
                value: type.label,
                type: 'square',
                color: type.color,
                inactive: !visibleTypes.includes(type.key),
              }))}
              wrapperStyle={{ fontSize: fontSettings.legendFontSize, color: '#ffffff' }}
            />
          )}
          {thresholdLines && thresholdLines.map((line, index) => (
            <ReferenceLine
              key={index}
              y={line.y}
              stroke={line.color}
              strokeWidth={line.thickness || 1}
            >
              <Label
                value={line.label}
                position="top"
                fontSize={fontSettings.thresholdFontSize}
                fill="#ffffff"
              />
            </ReferenceLine>
          ))}
          {scoringTypes.map((type, index) =>
            visibleTypes.includes(type.key) && (
              <Bar
                key={type.key}
                dataKey={type.key}
                stackId={type.stacked ? 'a' : undefined}
                fill={gradientFills && gradientFills[type.key] ? `url(#gradient-${type.key})` : type.color}
                shape={
                  <CustomBarShape
                    stroke={type.outlineColor || chartSettings.outlineColor}
                    strokeWidth={type.outlineWidth !== undefined ? type.outlineWidth : chartSettings.outlineWidth}
                    strokeDasharray={type.outlineType === 'dashed' ? '5 5' : 'none'}
                    borderRadius={type.borderRadius !== undefined ? type.borderRadius : chartSettings.borderRadius}
                    opacity={1}
                    gradient={gradientFills && gradientFills[type.key] ? `gradient-${type.key}` : undefined}
                  />
                }
                z={type.stackInFront ? index + 100 : index}
                label={showDataLabels ? ({ value, x, y, width, height }) => (
                  <Text
                    x={x + width / 2}
                    y={dataLabelPosition === 'inside' ? y + height / 2 : y - 10}
                    fill={type.labelColor || fontSettings.defaultLabelColor}
                    fontSize={fontSettings.dataLabelFontSize}
                    textAnchor="middle"
                    dy={dataLabelPosition === 'inside' ? 0 : -6}
                    transform={`rotate(${dataLabelRotation}, ${x + width / 2}, ${y + height / 2})`}
                    alignmentBaseline={dataLabelPosition === 'inside' ? 'middle' : 'bottom'}
                  >
                    {value}
                  </Text>
                ) : undefined}
              />
            )
          )}
          {annotations && annotations.map((annotation, index) => (
            <ReferenceDot
              key={index}
              x={annotation.x}
              y={annotation.y}
              r={5}
              stroke={annotation.color}
              label={{ position: 'top', value: annotation.text, fontSize: fontSettings.annotationFontSize, fill: '#ffffff' }}
            />
          ))}
          {gradientFills && Object.keys(gradientFills).map(key => (
            <defs key={key}>
              <linearGradient id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientFills[key].start} stopOpacity={0.8} />
                <stop offset="95%" stopColor={gradientFills[key].end} stopOpacity={0.8} />
              </linearGradient>
            </defs>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// New bar graph configuration with threshold line thickness
export const barGraphConfig = {
  data: [
    { team: 1, scoreTypeA: 90, scoreTypeB: 60, scoreTypeC: 85 },
    { team: 2, scoreTypeA: 70, scoreTypeB: 75, scoreTypeC: 80 },
    { team: 3, scoreTypeA: 95, scoreTypeB: 90, scoreTypeC: 70 },
    { team: 4, scoreTypeA: 88, scoreTypeB: 40, scoreTypeC: 92 },
  ],
  scoringTypes: [
    {
      key: 'scoreTypeA',
      label: 'Type A',
      color: '#1abc9c',
      stacked: true,
      stackInFront: false,
      outlineColor: '#ffffff',
      outlineWidth: 1,
      outlineType: 'solid',
      borderRadius: 5,
      labelColor: '#ffffff',
    },
    {
      key: 'scoreTypeB',
      label: 'Type B',
      color: '#3498db',
      stacked: true,
      stackInFront: true,
      outlineColor: '#ff0000',
      outlineWidth: 2,
      outlineType: 'dashed',
      borderRadius: 5,
      labelColor: '#ffffff',
    },
    {
      key: 'scoreTypeC',
      label: 'Type C',
      color: '#e74c3c',
      stacked: true,
      stackInFront: true,
      outlineColor: '#ffffff',
      outlineWidth: 1,
      outlineType: 'solid',
      borderRadius: 5,
      labelColor: '#ffffff',
    },
  ],
  chartSettings: {
    showGridlines: true,
    gridlineColor: '#444444',
  },
  xKey: 'team',
  yKey: 'score',
  xAxisLabel: 'Team',
  yAxisLabel: 'Score',
  yAxisMin: 0,
  yAxisMax: 300,
  showTooltip: true,
  tooltipSettings: {
    backgroundColor: '#333333',
    borderRadius: '8px',
    fontSize: '14px',
    cursorColor: 'rgba(255, 255, 255, 0.1)',
  },
  showLegend: true,
  interactiveLegend: true,
  legendPosition: 'top',
  annotations: [
    { x: 2, y: 70, text: 'Highest Score', color: '#e74c3c' },
    { x: 3, y: -70, text: 'Lowest Score', color: '#3498db' },
  ],
  responsive: true,
  maintainAspectRatio: true,
  showDataLabels: true,
  dataLabelPosition: 'inside',
  dataLabelRotation: 0,
  gradientFills: {
    scoreTypeA: { start: '#1abc9c', end: '#16a085' },
    scoreTypeB: { start: '#3498db', end: '#2980b9' },
    scoreTypeC: { start: '#e74c3c', end: '#c0392b' },
  },
  xAxisLabelRotation: -30,
  thresholdLines: [
    { y: 170, label: 'Target Score', color: '#00ff00', thickness: 3 },
  ],
  sortDataBy: 'y',
  width: 800,
  height: 500,
  title: 'Team Scores Overview',
  fontSettings: {
    titleFontSize: 24,
    axisLabelFontSize: 18,
    axisTickFontSize: 16,
    legendFontSize: 16,
    dataLabelFontSize: 14,
    tooltipFontSize: 14,
    thresholdFontSize: 14,
    annotationFontSize: 14,
    defaultLabelColor: '#ffffff',
  },
  margin: { top: 20, right: 20, left: 20, bottom: 20 },
};

const barGraphExample = () => (
  <div>
    <BarGraph config={barGraphConfig} />
  </div>
);

export default barGraphExample;