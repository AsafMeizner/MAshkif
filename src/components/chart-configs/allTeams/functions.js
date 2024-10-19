export const teleopTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.tsc + entry.tamps;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const teleopTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.tsc + entry.tamps;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const matchTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.tsc + entry.tamps + entry.ausc;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const matchTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.tsc + entry.tamps + entry.ausc;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const autonomousSpeakerTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.ausc;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }
    , {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const autonomousSpeakerTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.ausc;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const autonomousMovedTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.Mved ? 1 : 0; 

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100 
    }));
};

export const autonomousFoulTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.auf;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
}

export const autonomousFoulTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.auf;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const autonomousSpeakerAccuracyTeam = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalAttempts = entry.ausc + entry.auskpm;

        if (totalAttempts > 0) {
            const totalScore = entry.ausc / totalAttempts;
            acc[team].totalScore += totalScore;
            acc[team].count += 1;
        }

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: team.count > 0 
            ? Math.round((team.totalScore / team.count) * 100) / 100 
            : 0 
    }));
};

export const teleopSpeakerAccuracyTeam = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalAttempts = (entry.tsc || 0) + (entry.tsm || 0);

        if (totalAttempts > 0) {
            const totalScore = entry.tsc / totalAttempts;
            acc[team].totalScore += totalScore;
            acc[team].count += 1;
        }

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: team.count > 0 
            ? Math.round((team.totalScore / team.count) * 100) / 100 
            : 0 
    }));
}; 

export const teleopAmpAccuracyTeam = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;
        
        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalAttempts = entry.tamps + entry.tampm;

        if (totalAttempts > 0) {
            const totalScore = entry.tamps / totalAttempts;
            acc[team].totalScore += totalScore;
            acc[team].count += 1;
        }

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: team.count > 0 
            ? Math.round((team.totalScore / team.count) * 100) / 100 
            : 0 
    }));
};

export const teleopSpeakerTeamAverage = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.tsc;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const teleopSpeakerTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.tsc;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const teleopAmpTeamAverage = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.tamps;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const teleopAmpTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.tamps;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const endgameTrapTeamAverage = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;
        
        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }
        
        const totalScore = entry.cn;
        
        acc[team].totalScore += totalScore;
        acc[team].count += 1;
        
        return acc;
    }, {});
    
    return Object.values(teamScores)
        .map(team => ({
            teamNumber: team.teamNumber,
            averageScore: Math.round((team.totalScore / team.count) * 100) / 100
        }))
        .sort((a, b) => b.averageScore - a.averageScore); 
};

export const endgameClimbData = (scoutingData) => {
    const teamData = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;
        const position = entry.epo;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, No: 0, P: 0, Fo : 0, Fh: 0, Os: 0, Hm: 0, total: 0 };
        }

        acc[team][position] += 1;
        acc[team].total += 1;

        return acc;
    }, {});

    return Object.values(teamData).map(team => ({
        teamNumber: team.teamNumber,
        No: Math.round((team.No / team.total) * 100 * 100) / 100,
        P: Math.round((team.P / team.total) * 100 * 100) / 100,
        Fo: Math.round((team.Fo / team.total) * 100 * 100) / 100,
        Fh: Math.round((team.Fh / team.total) * 100 * 100) / 100,
        Os: Math.round((team.Os / team.total) * 100 * 100) / 100,
        Hm: Math.round((team.Hm / team.total) * 100 * 100) / 100,
    }));
};

export function ampTeleOpAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const totalScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.tamps || 0;
        return acc + matchScore;
    }, 0);

    return totalScore / scoutingData.length;
}

export function ampTeleOpMax(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const maxScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.tamps || 0;
        return Math.max(acc, matchScore);
    }, 0);

    return maxScore;
}

export function speakerTeleOpAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const totalScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.tsc || 0;
        return acc + matchScore;
    }, 0);

    return totalScore / scoutingData.length;
}

export function speakerTeleOpMax(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const maxScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.tsc || 0;
        return Math.max(acc, matchScore);
    }, 0);

    return maxScore;
}

export function speakerTeleOpAccuracyAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const totalShotsMade = scoutingData.reduce((acc, entry) => {
        const scored = entry.tsc || 0;
        return acc + scored;
    }, 0);

    const totalShotsAttempted = scoutingData.reduce((acc, entry) => {
        const missed = entry.tsm || 0;
        const scored = entry.tsc || 0;
        return acc + missed + scored;
    }, 0);

    return totalShotsAttempted ? (totalShotsMade / totalShotsAttempted) * 100 : 0;
}

export function speakerTeleOpAccuracyMax(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const maxAccuracy = scoutingData.reduce((acc, entry) => {
        const scored = entry.tsc || 0;
        const attempted = (entry.tsc || 0) + (entry.tsm || 0);
        const accuracy = attempted ? (scored / attempted) * 100 : 0;
        return Math.max(acc, accuracy);
    }, 0);

    return maxAccuracy;
}

export function ampTeleOpAccuracyAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const totalShotsMade = scoutingData.reduce((acc, entry) => {
        const scored = entry.tamps || 0;
        return acc + scored;
    }, 0);

    const totalShotsAttempted = scoutingData.reduce((acc, entry) => {
        const missed = entry.tampm || 0;
        const scored = entry.tamps || 0;
        return acc + missed + scored;
    }, 0);

    return totalShotsAttempted ? (totalShotsMade / totalShotsAttempted) * 100 : 0;
}

export function ampTeleOpAccuracyMax(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const maxAccuracy = scoutingData.reduce((acc, entry) => {
        const scored = entry.tamps || 0;
        const attempted = (entry.tamps || 0) + (entry.tampm || 0);
        const accuracy = attempted ? (scored / attempted) * 100 : 0;
        return Math.max(acc, accuracy);
    }, 0);

    return maxAccuracy;
}

export function autoSpeakerAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const totalScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.ausc || 0;
        return acc + matchScore;
    }, 0);

    return totalScore / scoutingData.length;
}

export function autoSpeakerMax(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const maxScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.ausc || 0;
        return Math.max(acc, matchScore);
    }, 0);

    return maxScore;
}

export function maxFeeding(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const maxScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.auf || 0;
        return Math.max(acc, matchScore);
    }, 0);

    return maxScore;
}

export function maxFouls(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const maxScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.auf || 0;
        return Math.max(acc, matchScore);
    }, 0);

    return maxScore;
}

export function feedingAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const totalScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.auf || 0;
        return acc + matchScore;
    }, 0);

    return totalScore / scoutingData.length;
}

export function foulsAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const totalScore = scoutingData.reduce((acc, entry) => {
        const matchScore = entry.auf || 0;
        return acc + matchScore;
    }, 0);

    return totalScore / scoutingData.length;
}

export function competitionEndPositionAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const positionScores = {
        "Hm": 5,  // Harmony
        "Os": 4,  // Onstage
        "Fh": 3,  // Failed Harmony
        "Fo": 2,  // Failed Onstage
        "P": 1,   // Parked
        "No": 0   // No Climb
    };

    const totalScore = scoutingData.reduce((acc, entry) => {
        const positionCode = entry.epo || "No";
        return acc + (positionScores[positionCode] || 0); 
    }, 0);

    return totalScore / scoutingData.length;
}