import * as reportFunctions from './functions';

export const alianceNoteAveragMultiNumber = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.matchNoteAverage(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.matchNoteAverage(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.matchNoteAverage(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.matchNoteMax(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.matchNoteMax(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.matchNoteMax(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const alianceAmpAveragMultiNumber = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.ampTeleOpAverage(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.ampTeleOpAverage(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.ampTeleOpAverage(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.ampTeleOpMax(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.ampTeleOpMax(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.ampTeleOpMax(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const alianceSpeakerTeleopAveragMultiNumber = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.speakerTeleOpAverage(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.speakerTeleOpAverage(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.speakerTeleOpAverage(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.speakerTeleOpMax(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.speakerTeleOpMax(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.speakerTeleOpMax(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const averageAutoSpeaker = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.averageAutonamousSpeeker(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.averageAutonamousSpeeker(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.averageAutonamousSpeeker(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.maxAutonamousSpeeker(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.maxAutonamousSpeeker(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.maxAutonamousSpeeker(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const feedingAverage = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.feedingAverage(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.feedingAverage(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.feedingAverage(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.feedingMax(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.feedingMax(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.feedingMax(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const averageTrap = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.averageTrap(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.averageTrap(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.averageTrap(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.averageTrap(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.averageTrap(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.averageTrap(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}
