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
            acc[team] = { teamNumber: team, No: 0, P: 0, Fh: 0, Os: 0, Hm: 0, total: 0 };
        }

        acc[team][position] += 1;
        acc[team].total += 1;

        return acc;
    }, {});

    return Object.values(teamData).map(team => ({
        teamNumber: team.teamNumber,
        No: Math.round((team.No / team.total) * 100 * 100) / 100,
        P: Math.round((team.P / team.total) * 100 * 100) / 100,
        Fh: Math.round((team.Fh / team.total) * 100 * 100) / 100,
        Os: Math.round((team.Os / team.total) * 100 * 100) / 100,
        Hm: Math.round((team.Hm / team.total) * 100 * 100) / 100,
    }));
};