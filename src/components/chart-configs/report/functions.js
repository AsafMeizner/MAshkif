export function ampTeleOpAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tamps || 0); 
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
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

export function ampTeleOpMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    return teamData.reduce((acc, entry) => {
      const matchScore = (entry.tamps || 0); 
      return Math.max(acc, matchScore);
    }, 0);
}

export function speakerTeleOpMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    return teamData.reduce((acc, entry) => {
      const matchScore = (entry.tsc || 0); 
      return Math.max(acc, matchScore);
    }, 0);
}

export function matchNoteAverage(scoutingData, teamNumber) {
    // total number of scores amp and speaker autonamous (ausc) and teleop
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const totalScore = teamData.reduce((acc, entry) => {
        const matchScore = (entry.tsc + entry.tamps + entry.ausc || 0); 
        return acc + matchScore;
    }
    , 0);

    return totalScore / teamData.length;
}

export function matchNoteMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    return teamData.reduce((acc, entry) => {
        const matchScore = (entry.tsc + entry.tamps + entry.ausc || 0); 
        return Math.max(acc, matchScore);
    }, 0);
}

export function averageAutonamousSpeeker(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const totalScore = teamData.reduce((acc, entry) => {
        const matchScore = (entry.ausc || 0); 
        return acc + matchScore;
    }, 0);

    return totalScore / teamData.length;
}

export function maxAutonamousSpeeker(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    return teamData.reduce((acc, entry) => {
        const matchScore = (entry.ausc || 0); 
        return Math.max(acc, matchScore);
    }, 0);
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

    return teamData.reduce((acc, entry) => {
        const matchScore = (entry.tfs || 0); 
        return Math.max(acc, matchScore);
    }, 0);
}

export function averageTrap(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const totalScore = teamData.reduce((acc, entry) => {
        const matchScore = (entry.cn || 0); 
        return acc + matchScore;
    }, 0);

    return totalScore / teamData.length;
}

export function maxTrap(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    return teamData.reduce((acc, entry) => {
        const matchScore = (entry.cn || 0); 
        return Math.max(acc, matchScore);
    }, 0);
}