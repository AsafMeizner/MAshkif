import * as specificTeamFunctions from './functions.js';

export const matchScoreByRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.matchScoreByRound(scoutingData, teamNumber),  
        title: `Match Scores by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'totalScore',
                label: 'Total Score',
                color: '#c4162a',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber', 
        yKey: 'totalScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,  
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const averageScoreConfig = (scoutingData, teamNumber) => {
    const averageScore = specificTeamFunctions.averageScore(scoutingData, teamNumber);
  
    return {
      color: '#c4162a',  
      title: `Average Score for Team ${teamNumber}`,
      min: 0, 
      max: specificTeamFunctions.maxScore(scoutingData, teamNumber), 
      value: Math.round(averageScore * 100) / 100,  
    };
};

export const autonomousSpeakerConfig = (scoutingData, teamNumber) => { 
    return {
        data: specificTeamFunctions.autonomousSpeakerPerMatch(scoutingData, teamNumber),  
        title: `Autonomous Speaker by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'autonomousScore', 
                label: 'Autonomous Speaker',
                color: '#73bf69',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber', 
        yKey: 'autonomousScore',  
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Autonomous Speaker',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        xAxisLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisSettings: {
            tickRotation: 0,  
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const averageAutoSpeakerConfig = (scoutingData, teamNumber) => {
    const averageAutoSpeaker = specificTeamFunctions.averageAutoSpeaker(scoutingData, teamNumber);
  
    return {
      color: '#73bf69',  
      title: `Average Autonomous Speaker for Team ${teamNumber}`,
      min: 0, 
      max: specificTeamFunctions.maxAutoSpeaker(scoutingData, teamNumber), 
      value: Math.round(averageAutoSpeaker * 100) / 100,  
    };
};

export const autoHasMovedConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autoHasMovedPerRound(scoutingData, teamNumber),  
        title: `Auto Has Moved by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'hasMoved',  
                label: 'Auto Has Moved',
                color: '#82b5d8',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber', 
        yKey: 'hasMoved',  
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Auto Has Moved',
        yAxisMin: 0,
        yAxisMax: 1,
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,  
            tickSize: 5,
            tickPadding: 10,
        },
    };
}

export const autoFoulPerRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousFoulPerMatch(scoutingData, teamNumber),
        title: `Auto Fouls by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'autonomousScore',
                label: 'Auto Fouls',
                color: '#ff4444',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'autonomousScore', 
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Auto Fouls',
        yAxisMin: 0,
        yAxisMax: 'auto', 
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const autoPathPerRoundConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.autoPathStackedData(scoutingData, teamNumber),
    title: `Autonomous Path by Round for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'Path1',
            label: 'Path 1',
            color: '#8884d8',
            stacked: true,
            name: 'Speaker 3 (Source Side)',  // Provide descriptive name if needed
        },
        {
            key: 'Path2',
            label: 'Path 2',
            color: '#82ca9d',
            stacked: true,
            name: 'Speaker 2 (Middle)',
        },
        {
            key: 'Path3',
            label: 'Path 3',
            color: '#ff4444',
            stacked: true,
            name: 'Speaker 1 (Amp Side)',
        },
        {
            key: 'Path4',
            label: 'Path 4',
            color: '#ffc658',
            stacked: true,
            name: 'Midline 5 (Source Edge)',
        },
        {
            key: 'Path5',
            label: 'Path 5',
            color: '#ff8042',
            stacked: true,
            name: 'Midline 4',
        },
        {
            key: 'Path6',
            label: 'Path 6',
            color: '#73bf69',
            stacked: true,
            name: 'Midline 3 (Middle)',
        },
        {
            key: 'Path7',
            label: 'Path 7',
            color: '#a4de6c',
            stacked: true,
            name: 'Midline 2',
        },
        {
            key: 'Path8',
            label: 'Path 8',
            color: '#d0ed57',
            stacked: true,
            name: 'Midline 1 (Amp Edge)',
        },
    ],
    chartSettings: {
        showGridlines: true,
        gridlineColor: '#444444',
    },
    xKey: 'roundNumber',
    yAxisLabel: 'Autonomous Path Taken',
    yAxisMin: 0,
    yAxisMax: 1,  
    xAxisLabelRotation: 0,
    showTooltip: true,
    tooltipSettings: {
        backgroundColor: '#333333',
        borderRadius: '8px',
        fontSize: '0.875rem',
        cursorColor: 'rgba(255, 255, 255, 0.1)',
    },
    showLegend: true,
    interactiveLegend: true,
    legendPosition: 'top',
    responsive: true,
    maintainAspectRatio: true,
    showDataLabels: false,
    sortOrder: 'ascending',
});

export const autoPathUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.autoPathPieData(scoutingData, teamNumber),
    title: `Autonomous Path Usage Percentages for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'Path1',
            label: 'Path 1',
            color: '#8884d8',
            name: 'Speaker 3 (Source Side)',
        },
        {
            key: 'Path2',
            label: 'Path 2',
            color: '#82ca9d',
            name: 'Speaker 2 (Middle)',
        },
        {
            key: 'Path3',
            label: 'Path 3',
            color: '#ff4444',
            name: 'Speaker 1 (Amp Side)',
        },
        {
            key: 'Path4',
            label: 'Path 4',
            color: '#ffc658',
            name: 'Midline 5 (Source Edge)',
        },
        {
            key: 'Path5',
            label: 'Path 5',
            color: '#ff8042',
            name: 'Midline 4',
        },
        {
            key: 'Path6',
            label: 'Path 6',
            color: '#73bf69',
            name: 'Midline 3 (Middle)',
        },
        {
            key: 'Path7',
            label: 'Path 7',
            color: '#a4de6c',
            name: 'Midline 2',
        },
        {
            key: 'Path8',
            label: 'Path 8',
            color: '#d0ed57',
            name: 'Midline 1 (Amp Edge)',
        },
    ],
    chartSettings: {
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        legendPosition: 'top',
        legendLayout: 'horizontal', 
        maintainAspectRatio: true,
        colors: [
            '#8884d8', '#82ca9d', '#ff4444', '#ffc658', 
            '#ff8042', '#73bf69', '#a4de6c', '#d0ed57'
        ],
        showLabels: true,
        labelPosition: 'outside',
    },
    responsive: true,
});