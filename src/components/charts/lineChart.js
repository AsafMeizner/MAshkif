import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, Text
} from 'recharts';

const LineGraph = ({ config }) => {
    const defaultConfig = {
        data: [],
        lines: [],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
            strokeWidth: 2,
        },
        xKey: 'x',
        yAxisLabel: 'Y-Axis',
        xAxisLabel: 'X-Axis',
        yAxisMin: 'auto',
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '10px',
            fontSize: '14px',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: false,
        width: 800,
        height: 500,
        title: 'Line Chart',
        fontSettings: {
            titleFontSize: 24,
            axisLabelFontSize: 18,
            axisTickFontSize: 16,
            legendFontSize: 16,
            tooltipFontSize: 16,
            defaultLabelColor: '#ffffff',
            dataLabelFontSize: 14,
        },
        margin: { top: 20, right: 20, left: 20, bottom: 20 },
    };

    const finalConfig = { ...defaultConfig, ...config };

    const {
        data,
        lines,
        chartSettings,
        xKey,
        yAxisLabel,
        xAxisLabel,
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
        responsive,
        maintainAspectRatio,
    } = finalConfig;

    const [visibleLines, setVisibleLines] = useState(lines.map(line => line.key));

    const handleLegendClick = (lineKey) => {
        if (finalConfig.interactiveLegend) {
            setVisibleLines(prevState =>
                prevState.includes(lineKey)
                    ? prevState.filter(key => key !== lineKey)
                    : [...prevState, lineKey]
            );
        }
    };

    return (
        <div style={{ width: responsive ? '100%' : width, height: responsive ? '100%' : height }}>
            {title && <h2 style={{ fontSize: fontSettings.titleFontSize, textAlign: 'center', marginBottom: 20, color: '#ffffff' }}>{title}</h2>}
            <ResponsiveContainer width="100%" height="100%" aspect={maintainAspectRatio ? 2 : 1}>
                <LineChart data={data} margin={margin}>
                    {chartSettings.showGridlines && (
                        <CartesianGrid stroke={chartSettings.gridlineColor} />
                    )}
                    <XAxis
                        dataKey={xKey}
                        tick={{ fontSize: fontSettings.axisTickFontSize, fill: fontSettings.defaultLabelColor }}
                    >
                        <Label value={xAxisLabel} offset={-10} position="insideBottom" fontSize={fontSettings.axisLabelFontSize} fill={fontSettings.defaultLabelColor} />
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
                                color: tooltipSettings.textColor,
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
                            payload={lines.map(line => ({
                                id: line.key,
                                value: line.label,
                                type: 'line',
                                color: line.color,
                                inactive: !visibleLines.includes(line.key),
                            }))}
                            wrapperStyle={{ fontSize: fontSettings.legendFontSize, color: '#ffffff' }}
                        />
                    )}
                    {lines.map(line =>
                        visibleLines.includes(line.key) && (
                            <Line
                                key={line.key}
                                type={line.step ? "step" : line.linear ? "linear" : line.smooth ? "natural" : "monotone"}
                                dataKey={line.key}
                                stroke={line.color}
                                strokeWidth={chartSettings.strokeWidth}
                                dot={line.showDots ? {
                                    fill: line.dotColor || line.color,
                                    stroke: line.dotColor || line.color,
                                    strokeWidth: 1,
                                    r: 4,
                                } : false}
                                isAnimationActive={false}
                                label={line.showDotLabels ? ({ value, x, y }) => (
                                    <Text
                                        x={x}
                                        y={y - 10}
                                        fill={line.dotLabelColor || '#ffffff'}
                                        fontSize={fontSettings.dataLabelFontSize}
                                        textAnchor="middle"
                                    >
                                        {value}
                                    </Text>
                                ) : null}
                            />
                        )
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// Example line graph configuration
export const lineGraphConfig = {
    data: [
        { x: 1, lineA: 50, lineB: 30, lineC: 200 },
        { x: 2, lineA: 20, lineB: 100, lineC: 230 },
        { x: 3, lineA: 150, lineB: 100, lineC: 50 },
        { x: 4, lineA: 200, lineB: 280, lineC: 100 },
        { x: 5, lineA: 40, lineB: 200, lineC: 130 },
    ],
    lines: [
        {
            key: 'lineA',
            label: 'Line A',
            color: '#8884d8',
            showDots: true,
            dotColor: '#5854d8',
            showDotLabels: true,
            linear: true,
        },
        {
            key: 'lineB',
            label: 'Line B',
            color: '#82ca9d',
            showDots: true,
            dotColor: '#52ca6d',
            showDotLabels: true,
            step: true,
        },
        {
            key: 'lineC',
            label: 'Line C',
            color: '#ffc658',
            showDots: true,
            dotColor: '#ffc328',
            showDotLabels: true,
            smooth: true,
        },
    ],
    chartSettings: {
        showGridlines: true,
        gridlineColor: '#444444',
        strokeWidth: 2,
    },
    xKey: 'x',
    yAxisLabel: 'Value',
    xAxisLabel: 'X-Axis',
    yAxisMin: 0,
    yAxisMax: 300,
    showTooltip: true,
    tooltipSettings: {
        backgroundColor: '#333333',
        borderRadius: '8px',
        fontSize: '14px',
        textColor: '#ffffff',
        cursorColor: 'rgba(255, 255, 255, 0.1)',
    },
    showLegend: true,
    legendPosition: 'top',
    responsive: true,
    maintainAspectRatio: true,
    width: 800,
    height: 500,
    title: 'Line Chart Example',
    fontSettings: {
        titleFontSize: 24,
        axisLabelFontSize: 18,
        axisTickFontSize: 16,
        legendFontSize: 16,
        tooltipFontSize: 14,
        dataLabelFontSize: 14,
        defaultLabelColor: '#ffffff',
    },
    margin: { top: 20, right: 20, left: 20, bottom: 20 },
};

const LineGraphExample = () => (
    <div>
        <LineGraph config={lineGraphConfig} />
    </div>
);

export default LineGraphExample;
