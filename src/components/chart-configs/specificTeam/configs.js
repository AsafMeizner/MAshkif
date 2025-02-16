import * as specificTeamFunctions from './functions.js';
import * as allTeamsFunctions from '../allTeams/functions.js';

// General

export const matchScoreByRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.matchScoreByRound(scoutingData, teamNumber),
        title: `Match Scores by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'coralScore',
                label: 'Coral Score',
                color: '#c4162a',
                name: 'Round Coral Score',
            },
            {
                key: 'algeeScore',
                label: 'Algee Score',
                color: '#1ed760',
                name: 'Round Algee Score',
            }
        ],
        xKey: 'roundNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Score',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
};

export const averageScoreConfig = (scoutingData, teamNumber) => {
    const averageCoralScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).averageCoralScore;
    const averageAlgeeScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).averageAlgeeScore;
    const maxCoralScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).maxCoralScore;
    const maxAlgeeScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).maxAlgeeScore;
    const averageFouls = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).averageFouls;
    const maxFouls = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).maxFouls;

    return {
        mainTitle: `General Stats For Team ${teamNumber}`,
        values: [
            {
                color: '#c4162a',
                title: 'Average / Max Coral Score',
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: '#1ed760',
                title: 'Average / Max Algee Score',
                min: 0,
                max: maxAlgeeScore,
                value: averageAlgeeScore,
            },
            {
                color: '#f4c20d',
                title: 'Average / Max Fouls',
                min: 0,
                max: maxFouls,
                value: averageFouls,
            }
        ],
    };
};

export const commentsPerTeamTableConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.generalPerTeamTable(scoutingData, teamNumber),
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
                key: 'fouls',
                label: 'Penalties',
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

// Autonomous

export const autonomousScoreByMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousAverageByMatch(scoutingData, teamNumber),
        title: `Autonomous Average by Match for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'l1Score',
                label: 'Coral Score',
                color: '#91101f',
                name: 'L1 Score',
                stacked: true,
            },
            {
                key: 'l2Score',
                label: 'Algee Score',
                color: '#c4162a',
                name: 'L2 Score',
                stacked: true,
            },
            {
                key: 'l3Score',
                label: 'Coral Score',
                color: '#e67e22',
                name: 'L3 Score',
                stacked: true,
            },
            {
                key: 'l4Score',
                label: 'Algee Score',
                color: '#f4c20d',
                name: 'L4 Score',
                stacked: true,
            },
            {
                key: 'algeeScore',
                label: 'Algee Score',
                color: '#1ed760',
                name: 'Algee Score',
                stacked: false,
            }
        ],
        xKey: 'matchNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Score',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
}

export const autonomousSummeryConfig = (scoutingData, teamNumber) => {
    const averageCoralScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).averageCoralScore;
    const averageAlgeeScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).averageAlgeeScore;
    const maxCoralScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).maxCoralScore;
    const maxAlgeeScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).maxAlgeeScore;

    return {
        mainTitle: `Autonomous Stats for Team ${teamNumber}`,
        values: [
            {
                color: '#c4162a',
                title: 'Average / Max Coral Score',
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: '#1ed760',
                title: 'Average / Max Algee Score',
                min: 0,
                max: maxAlgeeScore,
                value: averageAlgeeScore,
            },
        ],
    };
}

export const autonomousCoralPrecentInConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousCoralPrecentIn(scoutingData, teamNumber),
        title: `Autonomous Coral Precent In for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'coralL1Precent',
                label: 'Coral Level 1',
                color: '#c4162a',
                name: 'Coral Level 1 Precent',
            },
            {
                key: 'coralL2Precent',
                label: 'Coral Level 2',
                color: '#e67e22',
                name: 'Coral Level 2 Precent',
            },
            {
                key: 'coralL3Precent',
                label: 'Coral Level 3',
                color: '#f4c20d',
                name: 'Coral Level 3 Precent',
            },
            {
                key: 'coralL4Precent',
                label: 'Coral Level 4',
                color: '#1ed760',
                name: 'Coral Level 4 Precent',
            }
        ],
        xKey: 'roundNumber',
        yKey: 'coralL1Precent',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Precent In',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        yAxisMax: 100,
    };
}

export const autonomousLeftStartingLineConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousLeftStartingLine(scoutingData, teamNumber),
        title: `Autonomous Left Starting Line for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'leftStartingLine',
                label: 'Left Starting Line',
                color: '#c4162a',
                name: 'Left Starting Line',
            }
        ],
        xKey: 'roundNumber',
        yKey: 'leftStartingLine',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Left Starting Line',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        yAxisMax: 1,
    };
}
// Teleop

export const teleopCoralByMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopAverageByMatch(scoutingData, teamNumber),
        title: `Teleop Coral by Match for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'l1Score',
                label: 'Coral Score',
                color: '#91101f',
                name: 'L1 Score',
                stacked: true,
            },
            {
                key: 'l2Score',
                label: 'Algee Score',
                color: '#c4162a',
                name: 'L2 Score',
                stacked: true,
            },
            {
                key: 'l3Score',
                label: 'Coral Score',
                color: '#e67e22',
                name: 'L3 Score',
                stacked: true,
            },
            {
                key: 'l4Score',
                label: 'Algee Score',
                color: '#f4c20d',
                name: 'L4 Score',
                stacked: true,
            }
        ],
        xKey: 'matchNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Score',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
}

export const teleopAlgeeByMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopAverageByMatch(scoutingData, teamNumber),
        title: `Teleop Algee by Match for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'algeeBargeScore',
                label: 'Algee Barge Score',
                color: '#1ed760',
                name: 'Algee Barge Score',
                stacked: true,
            },
            {
                key: 'algeeProcessorScore',
                label: 'Algee Processor Score',
                color: '#0f6f32',
                name: 'Algee Processor Score',
                stacked: true,
            }
        ],
        xKey: 'matchNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Score',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
}

export const teleopCoralPrecentInConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopPercentagesByMatch(scoutingData, teamNumber),
        title: `Teleop Coral Percent In for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'overallPrecent',
                label: 'Coral Percent',
                color: '#c4162a',
                name: 'Coral Percent',
                stacked: false,
            },
            {
                key: 'algeeBargePrecent',
                label: 'Algee Barge Percent',
                color: '#1ed760',
                name: 'Algee Barge Percent',
                stacked: false,
            }
        ],
        xKey: 'roundNumber',
        yKey: 'coralL1Precent',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Precent In',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        yAxisMax: 100,
        showDataLabels: true,
        dataLabelPosition: 'top',
        dataLabelRotation: 0,
    };
}

export const teleopSummeryConfig = (scoutingData, teamNumber) => {
    const averageCoralScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageCoralScore;
    const averageAlgeeScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageAlgeeScore;
    const maxCoralScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxCoralScore;
    const maxAlgeeScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxAlgeeScore;

    const averageAlgeeRemovedFromReef = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageAlgeeRemovedFromReef;
    const maxAlgeeRemovedFromReef = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxAlgeeRemovedFromReef;
    const averageCoralPrecent = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageCoralPrecent;
    const maxCoralPrecent = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxCoralPrecent;

    return {
        mainTitle: `Teleop Stats for Team ${teamNumber}`,
        values: [
            {
                color: '#c4162a',
                title: 'Average / Max Coral Score',
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: '#6e93cc',
                title: 'Average / Max Coral Percent In',
                min: 0,
                max: maxCoralPrecent,
                value: averageCoralPrecent,
            },
            {
                color: '#1ed760',
                title: 'Average / Max Algee Score',
                min: 0,
                max: maxAlgeeScore,
                value: averageAlgeeScore,
            },
            {
                color: '#9c1ee9',
                title: 'Average / Max Algee Removed From Reef',
                min: 0,
                max: maxAlgeeRemovedFromReef,
                value: averageAlgeeRemovedFromReef,
            }
        ],
    };
}

export const teleopCoralLevelsSummeryConfig = (scoutingData, teamNumber) => {
    const averageCoralL1Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL1Score;
    const averageCoralL2Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL2Score;
    const averageCoralL3Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL3Score;
    const averageCoralL4Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL4Score;

    const maxCoralL1Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL1Score;
    const maxCoralL2Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL2Score;
    const maxCoralL3Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL3Score;
    const maxCoralL4Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL4Score;

    return {
        mainTitle: `Teleop Average / Max Coral Levels Stats for Team ${teamNumber}`,
        values: [
            {
                color: '#91101f',
                title: 'L1',
                min: 0,
                max: maxCoralL1Score,
                value: averageCoralL1Score,
            },
            {
                color: '#c4162a',
                title: 'L2',
                min: 0,
                max: maxCoralL2Score,
                value: averageCoralL2Score,
            },
            {
                color: '#e67e22',
                title: 'L3',
                min: 0,
                max: maxCoralL3Score,
                value: averageCoralL3Score,
            },
            {
                color: '#f4c20d',
                title: 'L4',
                min: 0,
                max: maxCoralL4Score,
                value: averageCoralL4Score,
            }
        ],
    };
}

// Endgame

export const endgameClimbDataPerRoundConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameClimbDataPerRound(scoutingData, teamNumber),
    title: `Endgame Climb Data by Round for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'No',
            label: 'No Climb',
            color: '#8884d8',
            stacked: true,
            name: 'No Climb',
        },
        {
            key: 'P',
            label: 'Parked',
            color: '#82ca9d',
            stacked: true,
            name: 'Parked',
        },
        {
            key: 'Fs',
            label: 'Failed Shallow Climb',
            color: '#01a2f0',
            stacked: true,
            name: 'Failed Shallow Climb',
        },
        {
            key: 'Fd',
            label: 'Failed Deep Harmony',
            color: '#ff4444',
            stacked: true,
            name: 'Failed Deep Harmony',
        },
        {
            key: 'Sc',
            label: 'Shallow Climb',
            color: '#ffc658',
            stacked: true,
            name: 'Shallow Climb',
        },
        {
            key: 'Dc',
            label: 'Deep Climb',
            color: '#ff8042',
            stacked: true,
            name: 'Deep Climb',
        },
    ],
    xKey: 'roundNumber',
    yAxisLabel: 'Climb Status',
    yAxisMin: 0,
    yAxisMax: 1,
    xAxisLabelRotation: 0,
    xAxisLabel: 'Round Number',
    sortOrder: 'ascending',
});

export const endgameClimbUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameClimbPieData(scoutingData, teamNumber),
    title: `Endgame Climb Usage Percentages for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'No',
            label: 'No Climb',
            color: '#8884d8',
            name: 'No Climb',
        },
        {
            key: 'P',
            label: 'Parked',
            color: '#82ca9d',
            name: 'Parked',
        },
        {
            key: 'Fs',
            label: 'Failed Shallow Climb',
            color: '#01a2f0',
            name: 'Failed Shallow Climb',
        },
        {
            key: 'Fd',
            label: 'Failed Deep Harmony',
            color: '#ff4444',
            name: 'Failed Deep Harmony',
        },
        {
            key: 'Sc',
            label: 'Shallow Climb',
            color: '#ffc658',
            name: 'Shallow Climb',
        },
        {
            key: 'Dc',
            label: 'Deep Climb',
            color: '#ff8042',
            name: 'Deep Climb',
        },
    ],
    chartSettings: {
        showTooltip: true,
    },
});

// Summery

export const teamPerformanceRadarConfig = (scoutingData, teamNumber) => {
    const maxEndPosition = 5;

    // Calculate the specific team's stats (averages)
    const averageCoralScore = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageCoralScore;
    const averageCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageCoralPercent;
    const averageAlgeeBarge = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageAlgeeBarge;
    const averageAlgeeProcessor = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageAlgeeProcessor;
    const averageAlgeeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageAlgeeRemovedFromReef;
    const averageEndPosition = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageEndPosition;

    // Calculate the max values for the specific team max for each category
    const maxCoralScore = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxCoralScore;
    const maxCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxCoralPercent;
    const maxAlgeeBarge = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxAlgeeBarge;
    const maxAlgeeProcessor = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxAlgeeProcessor;
    const maxAlgeeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxAlgeeRemovedFromReef;

    // Calculate competition-wide averages
    const allAverageCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageCoralScore;
    const allAverageCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageCoralPrecent;
    const allAverageAlgeeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageAlgeeBarge;
    const allAverageAlgeeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageAlgeeProcessor;
    const allAverageAlgeeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageAlgeeRemovedFromReef;
    const allAverageEndPosition = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageEndPosition;

    // Calculate the all teams max for each category
    const allMaxCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralScore;
    const allMaxCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralPrecent;
    const allMaxAlgeeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeBarge;
    const allMaxAlgeeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeProcessor;
    const allMaxAlgeeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeRemovedFromReef;

    // Normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'Coral Scored',
            [`Team ${teamNumber} Average`]: normalizeValue(averageCoralScore, allMaxCoralScore),
            'Competition Average': normalizeValue(allAverageCoralScore, allMaxCoralScore),
            [`Team ${teamNumber} Max`]: normalizeValue(maxCoralScore, allMaxCoralScore),
        },
        {
            subject: 'Coral Precent Accuracy',
            [`Team ${teamNumber} Average`]: normalizeValue(averageCoralPrecent, allMaxCoralPrecent),
            'Competition Average': normalizeValue(allAverageCoralPrecent, allMaxCoralPrecent),
            [`Team ${teamNumber} Max`]: normalizeValue(maxCoralPrecent, allMaxCoralPrecent),
        },
        {
            subject: 'Algee Barge',
            [`Team ${teamNumber} Average`]: normalizeValue(averageAlgeeBarge, allMaxAlgeeBarge),
            'Competition Average': normalizeValue(allAverageAlgeeBarge, allMaxAlgeeBarge),
            [`Team ${teamNumber} Max`]: normalizeValue(maxAlgeeBarge, allMaxAlgeeBarge),
        },
        {
            subject: 'Algee Processor',
            [`Team ${teamNumber} Average`]: normalizeValue(averageAlgeeProcessor, allMaxAlgeeProcessor),
            'Competition Average': normalizeValue(allAverageAlgeeProcessor, allMaxAlgeeProcessor),
            [`Team ${teamNumber} Max`]: normalizeValue(maxAlgeeProcessor, allMaxAlgeeProcessor),
        },
        {
            subject: 'Algee Removed From Reef',
            [`Team ${teamNumber} Average`]: normalizeValue(averageAlgeeRemovedFromReef, allMaxAlgeeRemovedFromReef),
            'Competition Average': normalizeValue(allAverageAlgeeRemovedFromReef, allMaxAlgeeRemovedFromReef),
            [`Team ${teamNumber} Max`]: normalizeValue(maxAlgeeRemovedFromReef, allMaxAlgeeRemovedFromReef),
        },
        {
            subject: 'End Position',
            [`Team ${teamNumber} Average`]: normalizeValue(averageEndPosition, maxEndPosition),
            'Competition Average': normalizeValue(allAverageEndPosition, maxEndPosition),
            [`Team ${teamNumber} Max`]: normalizeValue(maxEndPosition, maxEndPosition),
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${teamNumber} Average`,
                label: `Team ${teamNumber} Average`,
                color: '#8884d8',
            },
            {
                key: 'Competition Average',
                label: 'Competition Average',
                color: '#82ca9d',
            },
            {
                key: `Team ${teamNumber} Max`,
                label: `Team ${teamNumber} Max`,
                color: '#ff4444',
            },
        ],
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Score': 'Autonomous Speaker',
            'Teleop Speaker Score': 'Teleop Speaker',
            'Teleop Amp Score': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Team Performance Comparison',
    };
};

export const teamsAverageRadarConfig = (scoutingData, team1Number, team2Number) => {
    const maxEndPosition = 5;

    // Calculate the first specific team's stats (averages)
    const averageCoralScore = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageCoralScore;
    const averageCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageCoralPercent;
    const averageAlgeeBarge = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageAlgeeBarge;
    const averageAlgeeProcessor = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageAlgeeProcessor;
    const averageAlgeeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageAlgeeRemovedFromReef;
    const averageEndPosition = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageEndPosition;

    // Calculate the second specific team's stats (averages)
    const averageCoralScore2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageCoralScore;
    const averageCoralPrecent2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageCoralPercent;
    const averageAlgeeBarge2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageAlgeeBarge;
    const averageAlgeeProcessor2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageAlgeeProcessor;
    const averageAlgeeRemovedFromReef2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageAlgeeRemovedFromReef;
    const averageEndPosition2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageEndPosition;

    // Calculate the all teams max for each category
    const allMaxCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralScore;
    const allMaxCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralPrecent;
    const allMaxAlgeeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeBarge;
    const allMaxAlgeeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeProcessor;
    const allMaxAlgeeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeRemovedFromReef;

    // Normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'Coral Scored',
            [`Team ${team1Number} Average`]: normalizeValue(averageCoralScore, allMaxCoralScore),
            [`Team ${team2Number} Average`]: normalizeValue(averageCoralScore2, allMaxCoralScore),
        },
        {
            subject: 'Coral Precent Accuracy',
            [`Team ${team1Number} Average`]: normalizeValue(averageCoralPrecent, allMaxCoralPrecent),
            [`Team ${team2Number} Average`]: normalizeValue(averageCoralPrecent2, allMaxCoralPrecent),
        },
        {
            subject: 'Algee Barge',
            [`Team ${team1Number} Average`]: normalizeValue(averageAlgeeBarge, allMaxAlgeeBarge),
            [`Team ${team2Number} Average`]: normalizeValue(averageAlgeeBarge2, allMaxAlgeeBarge),
        },
        {
            subject: 'Algee Processor',
            [`Team ${team1Number} Average`]: normalizeValue(averageAlgeeProcessor, allMaxAlgeeProcessor),
            [`Team ${team2Number} Average`]: normalizeValue(averageAlgeeProcessor2, allMaxAlgeeProcessor),
        },
        {
            subject: 'Algee Removed From Reef',
            [`Team ${team1Number} Average`]: normalizeValue(averageAlgeeRemovedFromReef, allMaxAlgeeRemovedFromReef),
            [`Team ${team2Number} Average`]: normalizeValue(averageAlgeeRemovedFromReef2, allMaxAlgeeRemovedFromReef),
        },
        {
            subject: 'End Position',
            [`Team ${team1Number} Average`]: normalizeValue(averageEndPosition, maxEndPosition),
            [`Team ${team2Number} Average`]: normalizeValue(averageEndPosition2, maxEndPosition),
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${team1Number} Average`,
                label: `Team ${team1Number} Average`,
                color: '#aee5ff',
            },
            {
                key: `Team ${team2Number} Average`,
                label: `Team ${team2Number} Average`,
                color: '#e74c3c',
            },
        ],
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Score': 'Autonomous Speaker',
            'Teleop Speaker Score': 'Teleop Speaker',
            'Teleop Amp Score': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Team Average Performance Comparison',
    };
};

export const teamMaxRadarConfig = (scoutingData, team1Number, team2Number) => {
    const maxEndPosition = 5;

    // Calculate the max values for the first specific team max for each category
    const maxCoralScore = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxCoralScore;
    const maxCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxCoralPercent;
    const maxAlgeeBarge = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxAlgeeBarge;
    const maxAlgeeProcessor = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxAlgeeProcessor;
    const maxAlgeeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxAlgeeRemovedFromReef;

    // Calculate the max values for the second specific team max for each category
    const maxCoralScore2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxCoralScore;
    const maxCoralPrecent2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxCoralPercent;
    const maxAlgeeBarge2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxAlgeeBarge;
    const maxAlgeeProcessor2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxAlgeeProcessor;
    const maxAlgeeRemovedFromReef2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxAlgeeRemovedFromReef;

    // Calculate the all teams max for each category
    const allMaxCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralScore;
    const allMaxCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralPrecent;
    const allMaxAlgeeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeBarge;
    const allMaxAlgeeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeProcessor;
    const allMaxAlgeeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgeeRemovedFromReef;

    // Normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'Coral Scored',
            [`Team ${team1Number} Max`]: normalizeValue(maxCoralScore, allMaxCoralScore),
            [`Team ${team2Number} Max`]: normalizeValue(maxCoralScore2, allMaxCoralScore),
        },
        {
            subject: 'Coral Precent Accuracy',
            [`Team ${team1Number} Max`]: normalizeValue(maxCoralPrecent, allMaxCoralPrecent),
            [`Team ${team2Number} Max`]: normalizeValue(maxCoralPrecent2, allMaxCoralPrecent),
        },
        {
            subject: 'Algee Barge',
            [`Team ${team1Number} Max`]: normalizeValue(maxAlgeeBarge, allMaxAlgeeBarge),
            [`Team ${team2Number} Max`]: normalizeValue(maxAlgeeBarge2, allMaxAlgeeBarge),
        },
        {
            subject: 'Algee Processor',
            [`Team ${team1Number} Max`]: normalizeValue(maxAlgeeProcessor, allMaxAlgeeProcessor),
            [`Team ${team2Number} Max`]: normalizeValue(maxAlgeeProcessor2, allMaxAlgeeProcessor),
        },
        {
            subject: 'Algee Removed From Reef',
            [`Team ${team1Number} Max`]: normalizeValue(maxAlgeeRemovedFromReef, allMaxAlgeeRemovedFromReef),
            [`Team ${team2Number} Max`]: normalizeValue(maxAlgeeRemovedFromReef2, allMaxAlgeeRemovedFromReef),
        },
        {
            subject: 'End Position',
            [`Team ${team1Number} Max`]: normalizeValue(maxEndPosition, maxEndPosition),
            [`Team ${team2Number} Max`]: normalizeValue(maxEndPosition, maxEndPosition),
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${team1Number} Max`,
                label: `Team ${team1Number} Max`,
                color: '#8884d8',
            },
            {
                key: `Team ${team2Number} Max`,
                label: `Team ${team2Number} Max`,
                color: '#ff4444',
            },
        ],
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Score': 'Autonomous Speaker',
            'Teleop Speaker Score': 'Teleop Speaker',
            'Teleop Amp Score': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Team Performance Comparison',
    };
};