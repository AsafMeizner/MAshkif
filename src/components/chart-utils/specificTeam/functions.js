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

export function commentsPerTeamTable(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const formattedData = teamData.map((entry) => ({
        submissionTime: new Date(entry.submissionTime / 1_000_000).toLocaleString(),
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