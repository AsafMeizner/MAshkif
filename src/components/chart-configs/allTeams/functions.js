/*
Pre-Match:

scouter - Scouter Name
matchNumber - Match Number
teamNumber - Team Number
noShow - No Show?
Autonomous:

Mved - Left Starting Line
L1sc - L1 scored auto
L2sc - L2 scored auto
L3sc - L3 scored auto
L4sc - L4 scored auto
L1ms - L1 missed auto
L2ms - L2 missed auto
L3ms - L3 missed auto
L4ms - L4 missed auto
InG - Coral Ground (Collection in auto)
InS - Coral Source (Collection in auto)
RmAr - Algae Reef (Collection in auto)
RmAg - Algae Ground (Collection in auto)
ScAb - Scored Algae in Barge (auto)
ScAp - Scored Algae in Processor (auto)
TeleOp:

tL1sc - L1 scored TeleOp
tL2sc - L2 scored TeleOp
tL3sc - L3 scored TeleOp
tL4sc - L4 scored TeleOp
tL1ms - L1 missed TeleOp
tL2ms - L2 missed TeleOp
tL3ms - L3 missed TeleOp
tL4ms - L4 missed TeleOp
tInG - Coral Ground (Collection in TeleOp)
tInS - Coral Source (Collection in TeleOp)
tRmAr - Algae Reef (Collection in TeleOp)
tRmAg - Algae Ground (Collection in TeleOp)
tScAb - Scored Algae in Barge (TeleOp)
tScAp - Scored Algae in Processor (TeleOp)
Fou - TeleOp fouls (עבירות טלאופ)
End Game:

epo - End State
Post-Match:

dto - Flipped/Fell Over
yc - Yellow/Red Card
co - Notes
*/

// general chart configs
export const matchTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalCoralScore: 0, totalAlgaeScore: 0, totalScore: 0, count: 0 };
        }

        const totalCoralScore = entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc + entry.L1sc + entry.L2sc + entry.L3sc + entry.L4sc;
        const totalAlgaeScore = entry.tScAb + entry.tScAp + entry.ScAb + entry.ScAp;
        const totalScore = totalCoralScore + totalAlgaeScore;

        acc[team].totalCoralScore += totalCoralScore;
        acc[team].totalAlgaeScore += totalAlgaeScore;
        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageCoralScore: Math.round((team.totalCoralScore / team.count) * 100) / 100,
        averageAlgaeScore: Math.round((team.totalAlgaeScore / team.count) * 100) / 100,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const matchTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxCoralScore: 0, maxAlgaeScore: 0, maxScore: 0 };
        }

        const totalCoralScore = Number(entry.tL1sc) + Number(entry.tL2sc) + Number(entry.tL3sc) + Number(entry.tL4sc) + Number(entry.L1sc) + Number(entry.L2sc) + Number(entry.L3sc) + Number(entry.L4sc);
        const totalAlgaeScore = Number(entry.tScAb) + Number(entry.tScAp) + Number(entry.ScAb) + Number(entry.ScAp);

        acc[team].maxCoralScore = Math.max(acc[team].maxCoralScore, totalCoralScore);
        acc[team].maxAlgaeScore = Math.max(acc[team].maxAlgaeScore, totalAlgaeScore);

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxCoralScore + team.maxAlgaeScore,
        maxCoralScore: team.maxCoralScore,
        maxAlgaeScore: team.maxAlgaeScore
    }));
};

// autonomous chart configs

export const autoAveragesCoral = (scoutingData) => {
    const autoScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalCoralL1Score: 0, totalCoralL2Score: 0, totalCoralL3Score: 0, totalCoralL4Score: 0, totalScore: 0, count: 0 };
        }

        const totalCoralL1Score = Number(entry.L1sc);
        const totalCoralL2Score = Number(entry.L2sc);
        const totalCoralL3Score = Number(entry.L3sc);
        const totalCoralL4Score = Number(entry.L4sc);
        const totalScore = totalCoralL1Score + totalCoralL2Score + totalCoralL3Score + totalCoralL4Score;

        acc[team].totalCoralL1Score += totalCoralL1Score;
        acc[team].totalCoralL2Score += totalCoralL2Score;
        acc[team].totalCoralL3Score += totalCoralL3Score;
        acc[team].totalCoralL4Score += totalCoralL4Score;
        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(autoScores).map(team => ({
        teamNumber: team.teamNumber,
        averageCoralL1Score: Math.round((team.totalCoralL1Score / team.count) * 100) / 100,
        averageCoralL2Score: Math.round((team.totalCoralL2Score / team.count) * 100) / 100,
        averageCoralL3Score: Math.round((team.totalCoralL3Score / team.count) * 100) / 100,
        averageCoralL4Score: Math.round((team.totalCoralL4Score / team.count) * 100) / 100,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
}

export const autoMaxesCoral = (scoutingData) => {
    const autoScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxCoralL1Score: 0, maxCoralL2Score: 0, maxCoralL3Score: 0, maxCoralL4Score: 0, maxScore: 0 };
        }

        const totalCoralL1Score = Number(entry.L1sc);
        const totalCoralL2Score = Number(entry.L2sc);
        const totalCoralL3Score = Number(entry.L3sc);
        const totalCoralL4Score = Number(entry.L4sc);

        acc[team].maxCoralL1Score = Math.max(acc[team].maxCoralL1Score, totalCoralL1Score);
        acc[team].maxCoralL2Score = Math.max(acc[team].maxCoralL2Score, totalCoralL2Score);
        acc[team].maxCoralL3Score = Math.max(acc[team].maxCoralL3Score, totalCoralL3Score);
        acc[team].maxCoralL4Score = Math.max(acc[team].maxCoralL4Score, totalCoralL4Score);

        return acc;
    }, {});

    return Object.values(autoScores).map(team => ({
        teamNumber: team.teamNumber,
        maxCoralL1Score: team.maxCoralL1Score,
        maxCoralL2Score: team.maxCoralL2Score,
        maxCoralL3Score: team.maxCoralL3Score,
        maxCoralL4Score: team.maxCoralL4Score,
        maxScore: team.maxCoralL1Score + team.maxCoralL2Score + team.maxCoralL3Score + team.maxCoralL4Score
    }));
}

export const autoAveragesAlgae = (scoutingData) => {
    const autoScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalAlgaeScore: 0, count: 0 };
        }

        const totalAlgaeScore = Number(entry.ScAb) + Number(entry.ScAp);

        acc[team].totalAlgaeScore += totalAlgaeScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(autoScores).map(team => ({
        teamNumber: team.teamNumber,
        averageAlgaeScore: Math.round((team.totalAlgaeScore / team.count) * 100) / 100
    }));
}

export const autoMaxesAlgae = (scoutingData) => {
    const autoScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxAlgaeScore: 0 };
        }

        const totalAlgaeScore = Number(entry.ScAb) + Number(entry.ScAp);

        acc[team].maxAlgaeScore = Math.max(acc[team].maxAlgaeScore, totalAlgaeScore);

        return acc;
    }, {});

    return Object.values(autoScores).map(team => ({
        teamNumber: team.teamNumber,
        maxAlgaeScore: team.maxAlgaeScore
    }));
}

export const autoCoralScorePrecentage = (scoutingData) => {
    const autoScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, scoredCoral: 0, missedCoral: 0, count: 0 };
        }

        const scoredCoral = Number(entry.L1sc) + Number(entry.L2sc) + Number(entry.L3sc) + Number(entry.L4sc);
        const missedCoral = Number(entry.L1ms) + Number(entry.L2ms) + Number(entry.L3ms) + Number(entry.L4ms);

        acc[team].scoredCoral += scoredCoral;
        acc[team].missedCoral += missedCoral;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(autoScores).map(team => ({
        teamNumber: team.teamNumber,
        precentInAuto: (Math.round((team.scoredCoral / (team.scoredCoral + team.missedCoral)) * 100) || 0)
    }));
}

export const autoLeftStartingLine = (scoutingData) => {
    const autoScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, moved: 0, count: 0 };
        }

        const moved = Number(entry.Mved);

        acc[team].moved += moved;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(autoScores).map(team => ({
        teamNumber: team.teamNumber,
        moved: Math.round((team.moved / team.count) * 100)
    }));
}


// teleop chart configs

export const teleopAverageCoral = (scoutingData) => {
    const teleopScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalCoralL1Score: 0, totalCoralL2Score: 0, totalCoralL3Score: 0, totalCoralL4Score: 0, totalScore: 0, count: 0 };
        }

        const totalCoralL1Score = Number(entry.tL1sc);
        const totalCoralL2Score = Number(entry.tL2sc);
        const totalCoralL3Score = Number(entry.tL3sc);
        const totalCoralL4Score = Number(entry.tL4sc);
        const totalScore = totalCoralL1Score + totalCoralL2Score + totalCoralL3Score + totalCoralL4Score;

        acc[team].totalCoralL1Score += totalCoralL1Score;
        acc[team].totalCoralL2Score += totalCoralL2Score;
        acc[team].totalCoralL3Score += totalCoralL3Score;
        acc[team].totalCoralL4Score += totalCoralL4Score;
        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teleopScores).map(team => ({
        teamNumber: team.teamNumber,
        averageCoralL1Score: Math.round((team.totalCoralL1Score / team.count) * 100) / 100,
        averageCoralL2Score: Math.round((team.totalCoralL2Score / team.count) * 100) / 100,
        averageCoralL3Score: Math.round((team.totalCoralL3Score / team.count) * 100) / 100,
        averageCoralL4Score: Math.round((team.totalCoralL4Score / team.count) * 100) / 100,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
}

export const teleopMaxCoral = (scoutingData) => {
    const teleopScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxCoralL1Score: 0, maxCoralL2Score: 0, maxCoralL3Score: 0, maxCoralL4Score: 0, maxScore: 0 };
        }

        const totalCoralL1Score = Number(entry.tL1sc);
        const totalCoralL2Score = Number(entry.tL2sc);
        const totalCoralL3Score = Number(entry.tL3sc);
        const totalCoralL4Score = Number(entry.tL4sc);

        acc[team].maxCoralL1Score = Math.max(acc[team].maxCoralL1Score, totalCoralL1Score);
        acc[team].maxCoralL2Score = Math.max(acc[team].maxCoralL2Score, totalCoralL2Score);
        acc[team].maxCoralL3Score = Math.max(acc[team].maxCoralL3Score, totalCoralL3Score);
        acc[team].maxCoralL4Score = Math.max(acc[team].maxCoralL4Score, totalCoralL4Score);

        return acc;
    }, {});

    return Object.values(teleopScores).map(team => ({
        teamNumber: team.teamNumber,
        maxCoralL1Score: team.maxCoralL1Score,
        maxCoralL2Score: team.maxCoralL2Score,
        maxCoralL3Score: team.maxCoralL3Score,
        maxCoralL4Score: team.maxCoralL4Score,
        maxScore: team.maxCoralL1Score + team.maxCoralL2Score + team.maxCoralL3Score + team.maxCoralL4Score
    }));
}

export const teleopAverageAlgae = (scoutingData) => {
    const teleopScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalAlgaeProcessorScore: 0, totalAlgaeBargeScore: 0, totalAlgaeScore: 0, count: 0 };
        }

        const totalAlgaeProcessorScore = Number(entry.tScAp);
        const totalAlgaeBargeScore = Number(entry.tScAb);

        acc[team].totalAlgaeProcessorScore += totalAlgaeProcessorScore;
        acc[team].totalAlgaeBargeScore += totalAlgaeBargeScore;
        acc[team].totalAlgaeScore += totalAlgaeProcessorScore + totalAlgaeBargeScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teleopScores).map(team => ({
        teamNumber: team.teamNumber,
        averageAlgaeProcessorScore: Math.round((team.totalAlgaeProcessorScore / team.count) * 100) / 100,
        averageAlgaeBargeScore: Math.round((team.totalAlgaeBargeScore / team.count) * 100) / 100,
        averageAlgaeScore: Math.round((team.totalAlgaeScore / team.count) * 100) / 100
    }));
}

export const teleopMaxAlgae = (scoutingData) => {
    const teleopScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxAlgaeScore: 0, maxAlgaeProcessorScore: 0, maxAlgaeBargeScore: 0 };
        }

        const maxAlgaeProcessorScore = Number(entry.tScAp);
        const maxAlgaeBargeScore = Number(entry.tScAb);
        const totalAlgaeScore = maxAlgaeProcessorScore + maxAlgaeBargeScore;

        acc[team].maxAlgaeProcessorScore = Math.max(acc[team].maxAlgaeProcessorScore, maxAlgaeProcessorScore);
        acc[team].maxAlgaeBargeScore = Math.max(acc[team].maxAlgaeBargeScore, maxAlgaeBargeScore);
        acc[team].maxAlgaeScore = Math.max(acc[team].maxAlgaeScore, totalAlgaeScore);

        return acc;
    }, {});

    return Object.values(teleopScores).map(team => ({
        teamNumber: team.teamNumber,
        maxAlgaeProcessorScore: team.maxAlgaeProcessorScore,
        maxAlgaeBargeScore: team.maxAlgaeBargeScore,
        maxAlgaeScore: team.maxAlgaeScore
    }));
}

export const teleopCoralScorePrecentage = (scoutingData) => {
    const teleopScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, scoredCoral: 0, missedCoral: 0, count: 0 };
        }

        // const scoredCoral = Number(entry.tL1sc) + Number(entry.tL2sc) + Number(entry.tL3sc) + Number(entry.tL4sc);
        // const missedCoral = Number(entry.tL1ms) + Number(entry.tL2ms) + Number(entry.tL3ms) + Number(entry.tL4ms);
        const scoredCoral = Number(entry.tL2sc) + Number(entry.tL3sc) + Number(entry.tL4sc);
        const missedCoral = Number(entry.tL2ms) + Number(entry.tL3ms) + Number(entry.tL4ms);

        acc[team].scoredCoral += scoredCoral;
        acc[team].missedCoral += missedCoral;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teleopScores).map(team => ({
        teamNumber: team.teamNumber,
        precentInTeleop: (Math.round((team.scoredCoral / (team.scoredCoral + team.missedCoral)) * 100) || 0)
    }));
}

export const teleopRemovedAlgaeFromReef = (scoutingData) => {
    const teleopScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, removedAlgaeFromReef: 0, count: 0 };
        }

        const removedAlgaeFromReef = Number(entry.tRmAr);

        acc[team].removedAlgaeFromReef += removedAlgaeFromReef;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teleopScores).map(team => ({
        teamNumber: team.teamNumber,
        removedAlgaeFromReef: ((team.removedAlgaeFromReef / team.count).toFixed(2))
    }));
}

export function teleopSummeryCompetition(scoutingData) {
    if (!scoutingData.length) {
        return 0;
    }

    const averageCoralScore =
        scoutingData.reduce((acc, entry) => {
            const matchCoralScore =
                (entry.tL1sc || 0) +
                (entry.tL2sc || 0) +
                (entry.tL3sc || 0) +
                (entry.tL4sc || 0);
            return acc + matchCoralScore;
        }, 0) / scoutingData.length;

    const maxCoralScore = scoutingData.reduce((acc, entry) => {
        const matchCoralScore =
            (entry.tL1sc || 0) +
            (entry.tL2sc || 0) +
            (entry.tL3sc || 0) +
            (entry.tL4sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const averageAlgaeScore =
        scoutingData.reduce((acc, entry) => {
            const matchAlgaeScore = (entry.tScAb || 0) + (entry.tScAp || 0);
            return acc + matchAlgaeScore;
        }, 0) / scoutingData.length;

    const maxAlgaeScore = scoutingData.reduce((acc, entry) => {
        const matchAlgaeScore = (entry.tScAb || 0) + (entry.tScAp || 0);
        return Math.max(acc, matchAlgaeScore);
    }, 0);

    const averageAlgaeRemovedFromReef =
        scoutingData.reduce((acc, entry) => {
            const matchAlgaeRemoved = (entry.tRmAr || 0) + (entry.tRmAg || 0);
            return acc + matchAlgaeRemoved;
        }, 0) / scoutingData.length;

    const maxAlgaeRemovedFromReef = scoutingData.reduce((acc, entry) => {
        const matchAlgaeRemoved = (entry.tRmAr || 0) + (entry.tRmAg || 0);
        return Math.max(acc, matchAlgaeRemoved);
    }, 0);

    const averageCoralPrecent =
        scoutingData.reduce((acc, entry) => {
            const numerator =
                (entry.tL1sc || 0) +
                (entry.tL2sc || 0) +
                (entry.tL3sc || 0) +
                (entry.tL4sc || 0);
            const denominator =
                (entry.tL1sc || 0) +
                (entry.tL1ms || 0) +
                (entry.tL2sc || 0) +
                (entry.tL2ms || 0) +
                (entry.tL3sc || 0) +
                (entry.tL3ms || 0) +
                (entry.tL4sc || 0) +
                (entry.tL4ms || 0);
            const matchCoralPrecent = denominator
                ? parseFloat(((numerator / denominator) * 100).toFixed(1))
                : 0;
            return acc + matchCoralPrecent;
        }, 0) / scoutingData.length;

    const maxCoralPrecent = scoutingData.reduce((acc, entry) => {
        const matchCoralPrecent = (entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc)
            ? (
                (
                    ((entry.tL1sc || 0) +
                        (entry.tL2sc || 0) +
                        (entry.tL3sc || 0) +
                        (entry.tL4sc || 0)) /
                    ((entry.tL1sc || 0) +
                        (entry.tL1ms || 0) +
                        (entry.tL2sc || 0) +
                        (entry.tL2ms || 0) +
                        (entry.tL3sc || 0) +
                        (entry.tL3ms || 0) +
                        (entry.tL4sc || 0) +
                        (entry.tL4ms || 0))
                ) * 100
            ).toFixed(1)
            : 0;
        return Math.max(acc, matchCoralPrecent);
    }, 0);

    return {
        averageCoralScore,
        averageAlgaeScore,
        maxCoralScore,
        maxAlgaeScore,
        averageCoralPrecent,
        maxCoralPrecent,
        averageAlgaeRemovedFromReef,
        maxAlgaeRemovedFromReef,
    };
}

// endgame chart configs

export function competitionEndPositionAverage(scoutingData) {
    if (!scoutingData.length) { return 0; }

    const positionScores = {
        "Dc": 5,  // Deep Climb
        "Sc": 4,  // Shallow Climb
        "Fd": 3,  // Failed Deep Climb
        "Fs": 2,  // Failed Shallow Climb
        "P": 1,   // Parked
        "No": 0   // No Climb
    };

    const totalScore = scoutingData.reduce((acc, entry) => {
        const positionCode = entry.epo || "No";
        return acc + (positionScores[positionCode] || 0);
    }, 0);

    return totalScore / scoutingData.length;
}

export const endgameClimbData = (scoutingData) => {
    const teamData = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;
        const position = entry.epo;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, No: 0, P: 0, Fs: 0, Fd: 0, Sc: 0, Dc: 0, total: 0, scoreForSort: 0 };
        }

        acc[team][position] += 1;
        acc[team].total += 1;
        // acc[team].scoreForSort += (position === "Dc" ? 5 : position === "Sc" ? 4 : position === "Fd" ? 3 : position === "Fs" ? 2 : position === "P" ? 1 : 0);
        acc[team].scoreForSort += (position === "Dc" ? 5 : position === "Sc" ? 4 : position === "Fd" ? 3 : position === "Fs" ? 2 : position === "P" ? 1 : 0);

        return acc;
    }, {});

    return Object.values(teamData).map(team => ({
        teamNumber: team.teamNumber,
        No: Math.round((team.No / team.total) * 100 * 100) / 100,
        P: Math.round((team.P / team.total) * 100 * 100) / 100,
        Fs: Math.round((team.Fs / team.total) * 100 * 100) / 100,
        Fd: Math.round((team.Fd / team.total) * 100 * 100) / 100,
        Sc: Math.round((team.Sc / team.total) * 100 * 100) / 100,
        Dc: Math.round((team.Dc / team.total) * 100 * 100) / 100,
        scoreForSort: team.scoreForSort
    }));
};

// ===================================================================================================

export function generalSummeryCompetition(scoutingData) {
    if (!scoutingData.length) { 
        return 0; 
    }

    // Combined scores for both autonomous and teleop:
    // - Coral Scored
    // - Coral Percent Accuracy (teleop only)
    // - Algae Barge
    // - Algae Processor
    // - Algae Removed From Reef
    // - End Position

    const averageCoralScore = scoutingData.reduce((acc, entry) => {
        const matchCoralScore =
            (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0) +
            (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return acc + matchCoralScore;
    }, 0) / scoutingData.length;

    const maxCoralScore = scoutingData.reduce((acc, entry) => {
        const matchCoralScore =
            (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0) +
            (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const averageCoralPrecent = scoutingData.reduce((acc, entry) => {
        const numerator =
            (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        const denominator =
            (entry.tL1sc || 0) + (entry.tL1ms || 0) +
            (entry.tL2sc || 0) + (entry.tL2ms || 0) +
            (entry.tL3sc || 0) + (entry.tL3ms || 0) +
            (entry.tL4sc || 0) + (entry.tL4ms || 0);
        const matchCoralPrecent = denominator ? parseFloat(((numerator / denominator) * 100).toFixed(1)) : 0;
        return acc + matchCoralPrecent;
    }, 0) / scoutingData.length;

    const maxCoralPrecent = scoutingData.reduce((acc, entry) => {
        const matchCoralPrecent = (entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc)
            ? (
                (
                    ((entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0)) /
                    ((entry.tL1sc || 0) + (entry.tL1ms || 0) +
                     (entry.tL2sc || 0) + (entry.tL2ms || 0) +
                     (entry.tL3sc || 0) + (entry.tL3ms || 0) +
                     (entry.tL4sc || 0) + (entry.tL4ms || 0))
                ) * 100
            ).toFixed(1)
            : 0;
        return Math.max(acc, matchCoralPrecent);
    }, 0);

    const averageAlgaeBarge = scoutingData.reduce((acc, entry) => {
        const matchAlgaeScore = (entry.ScAb || 0) + (entry.tScAb || 0);
        return acc + matchAlgaeScore;
    }, 0) / scoutingData.length;

    const maxAlgaeBarge = scoutingData.reduce((acc, entry) => {
        const matchAlgaeScore = (entry.ScAb || 0) + (entry.tScAb || 0);
        return Math.max(acc, matchAlgaeScore);
    }, 0);

    const averageAlgaeProcessor = scoutingData.reduce((acc, entry) => {
        const matchAlgaeScore = (entry.ScAp || 0) + (entry.tScAp || 0);
        return acc + matchAlgaeScore;
    }, 0) / scoutingData.length;

    const maxAlgaeProcessor = scoutingData.reduce((acc, entry) => {
        const matchAlgaeScore = (entry.ScAp || 0) + (entry.tScAp || 0);
        return Math.max(acc, matchAlgaeScore);
    }, 0);

    const averageAlgaeRemovedFromReef = scoutingData.reduce((acc, entry) => {
        const matchAlgaeScore = (entry.tRmAr || 0) + (entry.tRmAg || 0);
        return acc + matchAlgaeScore;
    }, 0) / scoutingData.length;

    const maxAlgaeRemovedFromReef = scoutingData.reduce((acc, entry) => {
        const matchAlgaeScore = (entry.tRmAr || 0) + (entry.tRmAg || 0);
        return Math.max(acc, matchAlgaeScore);
    }, 0);

    // End Position: using updated scoring
    // "No" = 0, "P" = 1, "Fs" = 2, "Fd" = 3, "Sc" = 4, "Dc" = 5.
    const endPositionPoints = {
        No: 0,
        P: 1,
        Fs: 2,
        Fd: 3,
        Sc: 4,
        Dc: 5,
    };

    // Calculate average and maximum end position points per match
    const totalEndPoints = scoutingData.reduce((acc, entry) => {
        const points = endPositionPoints[entry.epo] || 0;
        return acc + points;
    }, 0);
    const averageEndPosition = totalEndPoints / scoutingData.length;

    const maxEndPosition = scoutingData.reduce((acc, entry) => {
        const points = endPositionPoints[entry.epo] || 0;
        return Math.max(acc, points);
    }, 0);

    return {
        averageCoralScore,
        maxCoralScore,
        averageCoralPrecent,
        maxCoralPrecent,
        averageAlgaeBarge,
        maxAlgaeBarge,
        averageAlgaeProcessor,
        maxAlgaeProcessor,
        averageAlgaeRemovedFromReef,
        maxAlgaeRemovedFromReef,
        averageEndPosition,
        maxEndPosition
    };
}


export function coralHeightSummeryCompetition(scoutingData) {
    // maxL1, maxL2, maxL3, maxL4, averageL1, averageL2, averageL3, averageL4
    // across all teams and matches
    if (!scoutingData.length) { return 0; }

    const maxL1 = scoutingData.reduce((acc, entry) => {
        return Math.max(acc, entry.L1sc || 0);
    }, 0);

    const maxL2 = scoutingData.reduce((acc, entry) => {
        return Math.max(acc, entry.L2sc || 0);
    }, 0);

    const maxL3 = scoutingData.reduce((acc, entry) => {
        return Math.max(acc, entry.L3sc || 0);
    }, 0);

    const maxL4 = scoutingData.reduce((acc, entry) => {
        return Math.max(acc, entry.L4sc || 0);
    }, 0);

    const averageL1 = scoutingData.reduce((acc, entry) => {
        return acc + (entry.L1sc || 0);
    }, 0) / scoutingData.length;

    const averageL2 = scoutingData.reduce((acc, entry) => {
        return acc + (entry.L2sc || 0);
    }, 0) / scoutingData.length;

    const averageL3 = scoutingData.reduce((acc, entry) => {
        return acc + (entry.L3sc || 0);
    }, 0) / scoutingData.length;

    const averageL4 = scoutingData.reduce((acc, entry) => {
        return acc + (entry.L4sc || 0);
    }, 0) / scoutingData.length;

    return {
        maxL1,
        maxL2,
        maxL3,
        maxL4,
        averageL1,
        averageL2,
        averageL3,
        averageL4
    };
}

// =======================================================================

// princess functions

export function princessTable(princessData) {
    if (!princessData.length) {
        return [];
    }

    const formattedData = princessData.map((entry) => ({
        submissionTime: new Date(entry.submissionTime).toLocaleString(),
        matchNumber: entry.matchNumber,
        scouter: entry.scouter,
        comment: entry.co || 'No Comment',
        teamNumber: entry.teamNumber,
    }));

    formattedData.sort((a, b) => a.teamNumber - b.teamNumber);

    return formattedData;
}
