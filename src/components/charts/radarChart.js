import React from 'react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const RadarGraph = ({ config }) => {
    const defaultConfig = {
        data: [],
        radars: [],
        radarSettings: {
            strokeWidth: 2,
            dot: true,
        },
        angleKey: 'subject',
        radiusKey: 'value',
        showRadiusAxis: true,
        customLabels: {},
        showGrid: true,
        gridType: 'polygon', // or 'circle'
        fillGrid: false,
        showLegend: true,
        responsive: true,
        width: '100%', // Use 100% width for responsiveness
        height: '100%', // Use 100% height for responsiveness
        title: 'Radar Chart',
        fontSettings: {
            titleFontSize: 24,
            labelFontSize: 16,
            legendFontSize: 16,
            defaultLabelColor: '#ffffff',
        },
    };

    const finalConfig = { ...defaultConfig, ...config };

    const {
        data,
        radars,
        radarSettings,
        angleKey,
        showRadiusAxis,
        customLabels,
        showGrid,
        gridType,
        fillGrid,
        showLegend,
        width,
        height,
        title,
        fontSettings,
    } = finalConfig;

    return (
        <div style={{ width: width, height: height }}>
            {title && <h2 style={{ fontSize: fontSettings.titleFontSize, textAlign: 'center', marginBottom: 20, color: '#ffffff' }}>{title}</h2>}
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                    {showGrid && (
                        <PolarGrid
                            gridType={gridType}
                            stroke={fillGrid ? 'rgba(255, 255, 255, 0.5)' : '#ffffff'}
                            fill={fillGrid ? 'rgba(255, 255, 255, 0.2)' : 'none'}
                            fillOpacity={fillGrid ? 0.6 : 0}
                        />
                    )}
                    <PolarAngleAxis
                        dataKey={angleKey}
                        tick={{ fontSize: fontSettings.labelFontSize, fill: fontSettings.defaultLabelColor }}
                        tickFormatter={tick => customLabels[tick] || tick}
                    />
                    {showRadiusAxis && (
                        <PolarRadiusAxis
                            angle={30}
                            tick={{ fontSize: fontSettings.labelFontSize, fill: fontSettings.defaultLabelColor }}
                        />
                    )}
                    {radars.map(radar => (
                        <Radar
                            key={radar.key}
                            name={radar.label}
                            dataKey={radar.key}
                            stroke={radar.color}
                            fill={radar.color}
                            fillOpacity={radarSettings.dot ? 0.1 : 0}
                            strokeWidth={radarSettings.strokeWidth}
                            dot={radarSettings.dot}
                        />
                    ))}
                    {showLegend && (
                        <Legend
                            wrapperStyle={{ fontSize: fontSettings.legendFontSize, color: '#ffffff' }}
                        />
                    )}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#333333',
                            borderRadius: '8px',
                            fontSize: fontSettings.labelFontSize,
                            color: '#ffffff',
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

// Example radar graph configuration
export const radarGraphConfig = {
    data: [
        {
            subject: 'Math', A: 120, B: 110, fullMark: 150,
        },
        {
            subject: 'Chinese', A: 98, B: 130, fullMark: 150,
        },
        {
            subject: 'English', A: 86, B: 130, fullMark: 150,
        },
        {
            subject: 'Geography', A: 99, B: 100, fullMark: 150,
        },
        {
            subject: 'Physics', A: 85, B: 90, fullMark: 150,
        },
        {
            subject: 'History', A: 65, B: 85, fullMark: 150,
        },
    ],
    radars: [
        {
            key: 'A',
            label: 'Student A',
            color: '#8884d8',
        },
        {
            key: 'B',
            label: 'Student B',
            color: '#82ca9d',
        },
    ],
    radarSettings: {
        strokeWidth: 2,
        dot: true,
    },
    angleKey: 'subject',
    showRadiusAxis: false,
    customLabels: {
        Math: 'Mathematics',
        Chinese: 'Chinese Language',
        English: 'English Language',
        Geography: 'Geography Studies',
        Physics: 'Physics Studies',
        History: 'History Studies',
    },
    showGrid: true,
    gridType: 'polygon', // Options: 'polygon', 'circle'
    fillGrid: true,
    showLegend: true,
    responsive: true,
    width: 800,
    height: 500,
    title: 'Radar Chart Example',
    fontSettings: {
        titleFontSize: 24,
        labelFontSize: 16,
        legendFontSize: 16,
        defaultLabelColor: '#ffffff',
    },
};

const RadarGraphExample = () => (
    <div>
        <RadarGraph config={radarGraphConfig} />
    </div>
);

export default RadarGraphExample;
