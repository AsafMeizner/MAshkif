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

export const commentsPerTeamTableConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.commentsPerTeamTable(scoutingData, teamNumber),
        title: `General data for Team ${teamNumber}`,
        columns: [
            {
                key: 'submissionTime',
                label: 'Submission Time',
            },
            {
                key: 'matchNumber',
                label: 'Match Number',
            },
            {
                key: 'scouter',
                label: 'Scouter Name',
            },
            {
                key: 'comment',
                label: 'Comments',
            },
            {
                key: 'card',
                label: 'Card',
            },
            {
                key: 'showedUp',
                label: 'Showed Up',
            },
            {
                key: 'diedOrTippedOver',
                label: 'Died/Tipped Over',
            },
        ],
        tableSettings: {
            showGridlines: true,
            responsive: true,
            maintainAspectRatio: true,
            enableSorting: true, // Enable sorting on columns
            sortBy: 'matchNumber', // Default sorting by match number
            sortOrder: 'ascending', // Ascending sorting order
        },
        columnResizeSettings: {
            resizable: true,
            minColumnWidth: 100,
        },
        pagination: true,
        rowsPerPage: 10,
        paginationSettings: {
            showPaginationControls: true,
            paginationControlPosition: 'bottom',
        },
    };
};

export const startPositionUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.startPositionPieData(scoutingData, teamNumber),
    title: `Starting Position Usage Percentages for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'Source',
            label: 'Source',
            color: '#8884d8',
            name: 'Source',
        },
        {
            key: 'Middle',
            label: 'Middle',
            color: '#82ca9d',
            name: 'Middle',
        },
        {
            key: 'Amp',
            label: 'Amp',
            color: '#ff4444',
            name: 'Amp',
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
            '#8884d8', '#82ca9d', '#ff4444'
        ],
        showLabels: true,
        labelPosition: 'outside',
    },
    responsive: true,
});


export const teleopScoreByRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopNotesByRoundSeperated(scoutingData, teamNumber),
        title: `Teleop Score by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopSpeaker',
                label: 'Teleop Speaker',
                color: '#f2cc0c',
                name: 'Tele-Op Speaker',
            },
            {
                key: 'teleopAmps',
                label: 'Teleop Amps',
                color: '#73bf69',
                name: 'Tele-Op Amp',
            },
            {
                key: 'teleopFeeder',
                label: 'Teleop Feeder',
                color: '#82b5d8',
                name: 'Tele-Op Feeding',
            }
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Teleop Score',
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

export const teleopScoreByRoundCombinedConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopScoreByRound(scoutingData, teamNumber),
        title: `Teleop Cycles by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopScore',
                label: 'Teleop Score',
                color: '#ea6460',
                name: 'Tele-Op Cycles',
                stacked: true,
            },
            {
                key: 'teleopFeeder',
                label: 'Teleop Feeder',
                color: '#82b5d8',
                name: 'Tele-Op Feeding',
                stacked: true,
            }
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Tele-Op Cycles',
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
}

export const teleopFoulPerMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopFoulPerMatch(scoutingData, teamNumber),
        title: `Teleop Fouls by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopScore',
                label: 'Teleop Fouls',
                color: '#ff4444',
                name: 'Tele-Op Fouls',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Teleop Fouls',
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
}

export const teleopAccuracyPerRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopAccuracyPerRound(scoutingData, teamNumber),
        title: `Teleop Accuracy by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopSpeakerAccuracy',
                label: 'Teleop Speaker Accuracy (%)',
                color: '#f2cc0c',
                name: 'Tele-Op Speaker Accuracy',
            },
            {
                key: 'teleopAmpAccuracy',
                label: 'Teleop Amp Accuracy (%)',
                color: '#73bf69',
                name: 'Tele-Op Amp Accuracy',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopAccuracy',  
        xAxisLabel: 'Round Number',
        yAxisLabel: 'Accuracy (%)',
        yAxisMin: 0,
        yAxisMax: 100,  
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

export const multiNumberConfig = (scoutingData, teamNumber) => {
    const ampTeleOpAverage = specificTeamFunctions.ampTeleOpAverage(scoutingData, teamNumber);
    const speakerTeleOpAverage = specificTeamFunctions.speakerTeleOpAverage(scoutingData, teamNumber);
    const ampTeleOpMax = specificTeamFunctions.ampTeleOpMax(scoutingData, teamNumber);
    const speakerTeleOpMax = specificTeamFunctions.speakerTeleOpMax(scoutingData, teamNumber);

    const speakerAccuracyAvarage = specificTeamFunctions.speakerTeleOpAccuracyAverage(scoutingData, teamNumber);
    const ampAccuracyAvarage = specificTeamFunctions.ampTeleOpAccuracyAverage(scoutingData, teamNumber);
    const speakerAccuracyMax = specificTeamFunctions.speakerTeleOpAccuracyMax(scoutingData, teamNumber);
    const ampAccuracyMax = specificTeamFunctions.ampTeleOpAccuracyMax(scoutingData, teamNumber);

    return {
        mainTitle: `Tele-Op Stats for Team ${teamNumber}`, 
        values: [
            {
                color: '#73bf69',
                title: 'Average TeleOp Speaker / Max',
                min: 0,
                max: Math.round(speakerTeleOpMax * 100) / 100,
                value: Math.round(speakerTeleOpAverage * 100) / 100,
            },
            {
                color: '#ffab40',
                title: 'Average TeleOp Amp / Max',
                min: 0,
                max: Math.round(ampTeleOpMax * 100) / 100,
                value: Math.round(ampTeleOpAverage * 100) / 100,
            },
            {
                color: '#40c4ff',
                title: 'Average Speaker Accurecy / Max',
                min: 0,
                max: Math.round(speakerAccuracyMax * 100) / 100,
                value: Math.round(speakerAccuracyAvarage * 100) / 100,
            },
            {
                color: '#c4162a',
                title: 'Average Amp Accurecy / Max',
                min: 0,
                max: Math.round(ampAccuracyMax * 100) / 100,
                value: Math.round(ampAccuracyAvarage * 100) / 100,
            },
        ],
    };
};