import * as functions from './functions.js';

// general chart configs

export const averageMatchScoreConfig = (scoutingData) => ({
    data: functions.matchTeamAverages(scoutingData),
    title: 'Match Averages by Team',
    scoringTypes: [
        {
            key: 'averageCoralScore',
            label: 'Average Coral Scored',
            color: '#3498db',
            stacked: true,
            name: 'Match Coral Scored',
        },
        {
            key: 'averageAlgeeScore',
            label: 'Average Algee Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Match Average Algee Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const maxMatchScoreConfig = (scoutingData) => ({
    data: functions.matchTeamMax(scoutingData),
    title: 'Match Maxes by Team',
    scoringTypes: [
        {
            key: 'maxCoralScore',
            label: 'Max Coral Scored',
            color: '#e74c3c',
            stacked: true,
            name: 'Match Max Coral Scored',
        },
        {
            key: 'maxAlgeeScore',
            label: 'Max Algee Scored',
            color: '#c652b8',
            stacked: true,
            name: 'Match Max Algee Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

// autonomous chart configs

export const autoCoralAveragesConfig = (scoutingData) => ({
    data: functions.autoAveragesCoral(scoutingData),
    title: 'Autonomous Coral Averages by Team',
    scoringTypes: [
        {
            key: 'averageCoralL4Score',
            label: 'Average Coral Scored',
            color: '#080660',
            stacked: true,
            name: 'Autonomous Coral L4 Scored',
        },
        {
            key: 'averageCoralL3Score',
            label: 'Average Coral Scored',
            color: '#415a81',
            stacked: true,
            name: 'Autonomous Coral L3 Scored',
        },
        {
            key: 'averageCoralL2Score',
            label: 'Average Coral Scored',
            color: '#2878b8',
            stacked: true,
            name: 'Autonomous Coral L2 Scored',
        },
        {
            key: 'averageCoralL1Score',
            label: 'Average Coral Scored',
            color: '#9ae0f0',
            stacked: true,
            name: 'Autonomous Coral L1 Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const autoCoralMaxesConfig = (scoutingData) => ({
    data: functions.autoMaxesCoral(scoutingData),
    title: 'Autonomous Coral Maxes by Team',
    scoringTypes: [
        {
            key: 'maxCoralL4Score',
            label: 'Max Coral L4 Scored',
            color: '#f1c40f',
            stacked: true,
            name: 'Autonomous Max L4 Coral Scored',
        },
        {
            key: 'maxCoralL3Score',
            label: 'Max Coral L3 Scored',
            color: '#e67e22',
            stacked: true,
            name: 'Autonomous Max L3 Coral Scored',
        },
        {
            key: 'maxCoralL2Score',
            label: 'Max Coral L2 Scored',
            color: '#e74c3c',
            stacked: true,
            name: 'Autonomous Max L2 Coral Scored',
        },
        {
            key: 'maxCoralL1Score',
            label: 'Max Coral L1 Scored',
            color: '#b33b2e',
            stacked: true,
            name: 'Autonomous Max L1 Coral Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const autoAlgeeAveragesConfig = (scoutingData) => ({
    data: functions.autoAveragesAlgee(scoutingData),
    title: 'Autonomous Algee Averages by Team',
    scoringTypes: [
        {
            key: 'averageAlgeeScore',
            label: 'Average auto Algae Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Average auto Algae Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageAlgeeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const autoAlgeeMaxesConfig = (scoutingData) => ({
    data: functions.autoMaxesAlgee(scoutingData),
    title: 'Autonomous Algee Maxes by Team',
    scoringTypes: [
        {
            key: 'maxAlgeeScore',
            label: 'Max Algee Scored',
            color: '#c652b8',
            stacked: true,
            name: 'Max Algee Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxAlgeeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const autoCoralScorePercentageConfig = (scoutingData) => ({
    data: functions.autoCoralScorePrecentage(scoutingData),
    title: 'Autonomous Coral Scored Percentage by Team',
    scoringTypes: [
        {
            key: 'precentInAuto',
            label: 'Coral Scored Percentage',
            color: '#3498db',
            stacked: true,
            name: 'Coral Scored Percentage',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'precentInAuto',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMax: 100,
});

export const autoLeftStartingLineConfig = (scoutingData) => ({
    data: functions.autoLeftStartingLine(scoutingData),
    title: 'Autonomous Left Starting Line Percentage by Team',
    scoringTypes: [
        {
            key: 'moved',
            label: 'Left Starting Line',
            color: '#e67e22',
            stacked: true,
            name: 'Left Starting Line',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'moved',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMax: 100,
});

// teleop chart configs

export const teleopCoralAveragesConfig = (scoutingData) => ({
    data: functions.teleopAverageCoral(scoutingData),
    title: 'Teleop Coral Averages by Team',
    scoringTypes: [
        {
            key: 'averageCoralL4Score',
            label: 'Average Coral Scored',
            color: '#aee5ff',
            stacked: true,
            name: 'Teleop Coral L4 Scored',
        },
        {
            key: 'averageCoralL3Score',
            label: 'Average Coral Scored',
            color: '#82ccdd',
            stacked: true,
            name: 'Teleop Coral L3 Scored',
        },
        {
            key: 'averageCoralL2Score',
            label: 'Average Coral Scored',
            color: '#6e93cc',
            stacked: true,
            name: 'Teleop Coral L2 Scored',
        },
        {
            key: 'averageCoralL1Score',
            label: 'Average Coral Scored',
            color: '#526e99',
            stacked: true,
            name: 'Teleop Coral L1 Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const teleopCoralMaxesConfig = (scoutingData) => ({
    data: functions.teleopMaxCoral(scoutingData),
    title: 'Teleop Coral Maxes by Team',
    scoringTypes: [
        {
            key: 'maxCoralL4Score',
            label: 'Max Coral L4 Scored',
            color: '#f1c40f',
            stacked: true,
            name: 'Teleop Max L4 Coral Scored',
        },
        {
            key: 'maxCoralL3Score',
            label: 'Max Coral L3 Scored',
            color: '#e67e22',
            stacked: true,
            name: 'Teleop Max L3 Coral Scored',
        },
        {
            key: 'maxCoralL2Score',
            label: 'Max Coral L2 Scored',
            color: '#e74c3c',
            stacked: true,
            name: 'Teleop Max L2 Coral Scored',
        },
        {
            key: 'maxCoralL1Score',
            label: 'Max Coral L1 Scored',
            color: '#b33b2e',
            stacked: true,
            name: 'Teleop Max L1 Coral Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const teleopAlgeeAveragesConfig = (scoutingData) => ({
    data: functions.teleopAverageAlgee(scoutingData),
    title: 'Teleop Algee Averages by Team',
    scoringTypes: [
        {
            key: 'averageAlgeeProcessorScore',
            label: 'Average Algee Processor Scored',
            color: '#138a3d',
            stacked: true,
            name: 'Teleop Algee Processor Scored',
        },
        {
            key: 'averageAlgeeBargeScore',
            label: 'Average Algee Barge Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Teleop Algee Barge Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageAlgeeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const teleopAlgeeMaxesConfig = (scoutingData) => ({
    data: functions.teleopMaxAlgee(scoutingData),
    title: 'Teleop Algee Maxes by Team',
    scoringTypes: [
        {
            key: 'maxAlgeeProcessorScore',
            label: 'Max Algee Processor Scored',
            color: '#138a3d',
            stacked: true,
            name: 'Teleop Max Algee Processor Scored',
        },
        {
            key: 'maxAlgeeBargeScore',
            label: 'Max Algee Barge Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Teleop Max Algee Barge Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxAlgeeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const teleopCoralScorePercentageConfig = (scoutingData) => ({
    data: functions.teleopCoralScorePrecentage(scoutingData),
    title: 'Teleop Coral Scored Percentage by Team (No L1)',
    scoringTypes: [
        {
            key: 'precentInTeleop',
            label: 'Coral Scored Percentage',
            color: '#3498db',
            stacked: true,
            name: 'Coral Scored Percentage',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'precentInTeleop',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMax: 100,
});

export const teleopRemovedAlgeeFromReefConfig = (scoutingData) => ({
    data: functions.teleopRemovedAlgeeFromReef(scoutingData),
    title: 'Algee Removed from Reef by Team',
    scoringTypes: [
        {
            key: 'removedAlgeeFromReef',
            label: 'Algee Removed',
            color: '#1ed760',
            stacked: true,
            name: 'Algee Removed',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'removedAlgeeFromReef',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Algee Removed',
});

export const teleopSummeryConfig = (scoutingData) => {
    const {
        averageCoralScore,
        averageAlgeeScore,
        maxCoralScore,
        maxAlgeeScore,
        averageAlgeeRemovedFromReef,
        maxAlgeeRemovedFromReef,
        averageCoralPrecent,
        maxCoralPrecent,
    } = functions.teleopSummeryCompetition(scoutingData);

    return {
        mainTitle: `Teleop Stats Competition Wide`,
        values: [
            {
                color: "#c4162a",
                title: "Average / Max Coral Scored",
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: "#6e93cc",
                title: "Average / Max Coral Percent In",
                min: 0,
                max: maxCoralPrecent,
                value: averageCoralPrecent,
            },
            {
                color: "#1ed760",
                title: "Average / Max Algee Scored",
                min: 0,
                max: maxAlgeeScore,
                value: averageAlgeeScore,
            },
            {
                color: "#9c1ee9",
                title: "Average / Max Algee Removed From Reef",
                min: 0,
                max: maxAlgeeRemovedFromReef,
                value: averageAlgeeRemovedFromReef,
            },
        ],
    };
};
// endgame chart configs

export const endgameClimbPercentByTeamConfig = (scoutingData) => ({
    data: functions.endgameClimbData(scoutingData),
    title: 'Endgame Climb Percent By Team',
    scoringTypes: [
        {
            key: 'No',
            label: 'No Climb',
            color: '#ff4444',
            stacked: true,
            name: 'No Climb',
        },
        {
            key: 'P',
            label: 'Parked',
            color: '#ff8042',
            stacked: true,
            name: 'Parked',
        },
        {
            key: 'Fs',
            label: 'Failed Shallow Climb',
            color: '#ffc658',
            stacked: true,
            name: 'Failed Shallow Climb',
        },
        {
            key: 'Fd',
            label: 'Failed Deep Climb',
            color: '#fff258',
            stacked: true,
            name: 'Failed Deep Climb',
        },
        {
            key: 'Sc',
            label: 'Shallow Climb',
            color: '#82ca9d',
            stacked: true,
            name: 'Shallow Climb',
        },
        {
            key: 'Dc',
            label: 'Deep Climb',
            color: '#8884d8',
            stacked: true,
            name: 'Deep Climb',
        },
    ],
    xKey: 'teamNumber',
    yKey: 'scoreForSort',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMin: 0,
    yAxisMax: 100,
});

// ===================================================================================================