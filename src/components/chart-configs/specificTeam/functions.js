export function matchScoreByRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {return [];}

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber; 
        const autonomousScore = entry.ausc || 0;
        const teleopScore = (entry.tsc || 0) + (entry.tamps || 0);
        const totalScore = autonomousScore + teleopScore;  

        return {
            roundNumber,
            totalScore,
        };
    });
    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

export function autonomousSpeakerPerMatch(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {return [];}

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber; 
        const autonomousScore = entry.ausc || 0;

        return {
            roundNumber,
            autonomousScore,
        };
    });
    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

export function averageScore(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.ausc || 0) + (entry.tsc || 0) + (entry.tamps || 0); // Autonomous + Teleop scores
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
}

export function maxScore(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const maxScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.ausc || 0) + (entry.tsc || 0) + (entry.tamps || 0); 
      return Math.max(acc, matchScore);
    }, 0);
  
    return maxScore;
}

export function averageAutoSpeaker(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) { return 0; }
  
    const totalAutoSpeaker = teamData.reduce((acc, entry) => {
        const autoSpeaker = entry.ausc || 0; 
        return acc + autoSpeaker;
    }, 0);
  
    return totalAutoSpeaker / teamData.length;
}

export function maxAutoSpeaker(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) { return 0; }
  
    const maxAutoSpeaker = teamData.reduce((acc, entry) => {
        const autoSpeaker = entry.ausc || 0;
        return Math.max(acc, autoSpeaker);
    }, 0);
  
    return maxAutoSpeaker;
}

export function autoHasMovedPerRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return 0; }

    const autoHasMoved = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        const hasMoved = entry.Mved ? 1 : 0;

        return {
            roundNumber,
            hasMoved,
        };
    });

    autoHasMoved.sort((a, b) => a.roundNumber - b.roundNumber);

    return autoHasMoved;
}

export function autonomousFoulPerMatch(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const foulsByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber; 
        const autonomousFoul = entry.auf || 0; 

        return {
            roundNumber,
            autonomousScore: autonomousFoul,
        };
    });

    foulsByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return foulsByRound;
}

export function autoPathStackedData(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const autoPaths = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        return {
            roundNumber,
            Path1: entry.a_gp_Path === "1" ? 1 : 0,
            Path2: entry.a_gp_Path === "2" ? 1 : 0,
            Path3: entry.a_gp_Path === "3" ? 1 : 0,
            Path4: entry.a_gp_Path === "4" ? 1 : 0,
            Path5: entry.a_gp_Path === "5" ? 1 : 0,
            Path6: entry.a_gp_Path === "6" ? 1 : 0,
            Path7: entry.a_gp_Path === "7" ? 1 : 0,
            Path8: entry.a_gp_Path === "8" ? 1 : 0,
        };
    });

    autoPaths.sort((a, b) => a.roundNumber - b.roundNumber);

    return autoPaths;
}

export function autoPathPieData(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const pathCounts = {
        Path1: 0,
        Path2: 0,
        Path3: 0,
        Path4: 0,
        Path5: 0,
        Path6: 0,
        Path7: 0,
        Path8: 0,
    };

    teamData.forEach((entry) => {
        pathCounts.Path1 += entry.a_gp_Path === "1" ? 1 : 0;
        pathCounts.Path2 += entry.a_gp_Path === "2" ? 1 : 0;
        pathCounts.Path3 += entry.a_gp_Path === "3" ? 1 : 0;
        pathCounts.Path4 += entry.a_gp_Path === "4" ? 1 : 0;
        pathCounts.Path5 += entry.a_gp_Path === "5" ? 1 : 0;
        pathCounts.Path6 += entry.a_gp_Path === "6" ? 1 : 0;
        pathCounts.Path7 += entry.a_gp_Path === "7" ? 1 : 0;
        pathCounts.Path8 += entry.a_gp_Path === "8" ? 1 : 0;
    });

    return Object.keys(pathCounts).map((pathKey) => ({
        name: pathKey,  
        value: pathCounts[pathKey], 
    }));
}

export function generalPerTeamTable(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const formattedData = teamData.map((entry) => ({
        submissionTime: new Date(entry.submissionTime).toLocaleString(),
        matchNumber: entry.matchNumber,
        scouter: entry.scouter,
        comment: entry.co || 'No Comment',
        card: entry.yc || 'No Card',
        showedUp: entry.noShow ? 'No' : 'Yes',
        diedOrTippedOver: entry.dto ? 'Yes' : 'No',
    }));

    formattedData.sort((a, b) => a.matchNumber - b.matchNumber);

    return formattedData;
}

export function startPositionPieData(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const positionCounts = {
        Source: 0,
        Middle: 0,
        Amp: 0,
    };

    teamData.forEach((entry) => {
        positionCounts.Source += entry.Prsp === "Source" ? 1 : 0;
        positionCounts.Middle += entry.Prsp === "Middle" ? 1 : 0;
        positionCounts.Amp += entry.Prsp === "Amp" ? 1 : 0;
    });

    return Object.keys(positionCounts).map((positionKey) => ({
        name: positionKey,  
        value: positionCounts[positionKey], 
    }));
}

export function teleopNotesByRoundSeperated(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {return [];}

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber; 
        const teleopSpeaker = entry.tsc || 0;
        const teleopAmps = entry.tamps || 0;
        const teleopFeeder = entry.tfs || 0;

        return {
            roundNumber,
            teleopSpeaker,
            teleopAmps,
            teleopFeeder
        };
    });

    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

export function teleopScoreByRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {return [];}

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber; 
        const teleopScore = (entry.tsc || 0) + (entry.tamps || 0);
        const teleopFeeder = entry.tfs || 0;

        return {
            roundNumber,
            teleopScore,
            teleopFeeder
        };
    });

    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

export function teleopFoulPerMatch(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const foulsByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber; 
        const teleopFoul = entry.Fou || 0; 

        return {
            roundNumber,
            teleopScore: teleopFoul,
        };
    });

    foulsByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return foulsByRound;
}

export function teleopAccuracyPerRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const accuracyByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;

        const speakerScored = entry.tsc || 0;
        const speakerMissed = entry.tsm || 0;
        const speakerAttempts = speakerScored + speakerMissed;

        const teleopSpeakerAccuracy = speakerAttempts > 0 
            ? ((speakerScored / speakerAttempts) * 100).toFixed(2)
            : 0;

        const ampScored = entry.tamps || 0;
        const ampMissed = entry.tampm || 0;
        const ampAttempts = ampScored + ampMissed;

        const teleopAmpAccuracy = ampAttempts > 0 
            ? ((ampScored / ampAttempts) * 100).toFixed(2)
            : 0;

        return {
            roundNumber,
            teleopSpeakerAccuracy: parseFloat(teleopSpeakerAccuracy),  
            teleopAmpAccuracy: parseFloat(teleopAmpAccuracy),         
        };
    });

    accuracyByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return accuracyByRound;
}

export function ampTeleOpAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tamps || 0); 
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
}

export function ampTeleOpMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const maxScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tamps || 0); 
      return Math.max(acc, matchScore);
    }, 0);
  
    return maxScore;
}

export function speakerTeleOpAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tsc || 0); 
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
}

export function speakerTeleOpMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const maxScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tsc || 0); 
      return Math.max(acc, matchScore);
    }, 0);
  
    return maxScore;
}

export function speakerTeleOpAccuracyAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const totalShotsMade = teamData.reduce((acc, entry) => {
        const scored = entry.tsc || 0;
        return acc + scored;
    }, 0);

    const totalShotsAttempted = teamData.reduce((acc, entry) => {
        const missed = entry.tsm || 0; 
        const scored = entry.tsc || 0;
        return acc + missed + scored;
    }, 0);

    return totalShotsAttempted ? (totalShotsMade / totalShotsAttempted) * 100 : 0;
}

export function speakerTeleOpAccuracyMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const maxAccuracy = teamData.reduce((acc, entry) => {
        const scored = entry.tsc || 0;
        const attempted = (entry.tsc || 0) + (entry.tsm || 0);
        const accuracy = attempted ? (scored / attempted) * 100 : 0;
        return Math.max(acc, accuracy);
    }, 0);

    return maxAccuracy;
}

export function ampTeleOpAccuracyAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const totalShotsMade = teamData.reduce((acc, entry) => {
        const scored = entry.tamps || 0;
        return acc + scored;
    }, 0);

    const totalShotsAttempted = teamData.reduce((acc, entry) => {
        const missed = entry.tampm || 0;
        const scored = entry.tamps || 0;
        return acc + missed + scored;
    }, 0);

    return totalShotsAttempted ? (totalShotsMade / totalShotsAttempted) * 100 : 0;
}

export function ampTeleOpAccuracyMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const maxAccuracy = teamData.reduce((acc, entry) => {
        const scored = entry.tamps || 0;
        const attempted = (entry.tamps || 0) + (entry.tampm || 0);
        const accuracy = attempted ? (scored / attempted) * 100 : 0;
        return Math.max(acc, accuracy);
    }, 0);

    return maxAccuracy;
}

export function endgameClimbDataPerRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const climbData = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        return {
            roundNumber,
            No: entry.epo === "No" ? 1 : 0,
            P: entry.epo === "P" ? 1 : 0,
            Fh: entry.epo === "Fh" ? 1 : 0,
            Os: entry.epo === "Os" ? 1 : 0,
            Hm: entry.epo === "Hm" ? 1 : 0,
        };
    });

    climbData.sort((a, b) => a.roundNumber - b.roundNumber);

    return climbData;
}

export function endgameClimbPieData(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const climbCounts = {
        No: 0,
        P: 0,
        Fh: 0,
        Os: 0,
        Hm: 0,
    };

    teamData.forEach((entry) => {
        climbCounts.No += entry.epo === "No" ? 1 : 0;
        climbCounts.P += entry.epo === "P" ? 1 : 0;
        climbCounts.Fh += entry.epo === "Fh" ? 1 : 0;
        climbCounts.Os += entry.epo === "Os" ? 1 : 0;
        climbCounts.Hm += entry.epo === "Hm" ? 1 : 0;
    });

    return Object.keys(climbCounts).map((climbKey) => ({
        name: climbKey,
        value: climbCounts[climbKey],
    }));
}

export function endgameTrapPerRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const trapData = teamData.map((entry) => ({
        roundNumber: entry.matchNumber,
        trapScore: entry.cn || 0,
    }));

    trapData.sort((a, b) => a.roundNumber - b.roundNumber);

    return trapData;
}

export function speakerAutoAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.ausc || 0); 
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
}

export function speakerAutoMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const maxScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.ausc || 0); 
      return Math.max(acc, matchScore);
    }, 0);
  
    return maxScore;
}

export function feedingAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tfs || 0); 
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
}

export function feedingMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const maxScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tfs || 0); 
      return Math.max(acc, matchScore);
    }, 0);
  
    return maxScore;
}

export function foulsAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.Fou || 0); 
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
}

export function endPositionAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}

    const positionScores = {
      "Hm": 4,  // Harmony
      "Os": 3,  // Onstage
      "Fh": 2,  // Failed Harmony
      "P": 1,   // Parked
      "No": 0   // No Climb
    };
  
    const totalScore = teamData.reduce((acc, entry) => {
      const positionCode = entry.epo || "No"; 
      return acc + (positionScores[positionCode] || 0); 
    }, 0);
  
    return totalScore / teamData.length;
}

export function maxEndPositionForMatch(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}

    const positionScores = {
      "Hm": 4,  // Harmony
      "Os": 3,  // Onstage
      "Fh": 2,  // Failed Harmony
      "P": 1,   // Parked
      "No": 0   // No Climb
    };
  
    const maxScore = teamData.reduce((acc, entry) => {
      const positionCode = entry.epo || "No"; 
      return Math.max(acc, positionScores[positionCode] || 0); 
    }, 0);
  
    return maxScore;
}