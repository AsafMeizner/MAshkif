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

import { calculateEstemaitedMaxPoints, calculateEstimatedMaxRP } from './matchCalculator.js';
import * as specificTeamFunctions from '../specificTeam/functions.js';

// General
export function allianceMaxPoints(scoutingData, team1Number, team2number, team3Number) {
    return calculateEstemaitedMaxPoints(scoutingData, team1Number, team2number, team3Number);
}

export function allianceRpFocusPoints(scoutingData, team1Number, team2number, team3Number) {
    return calculateEstimatedMaxRP(scoutingData, team1Number, team2number, team3Number);
}

export function averageAutonomousCoralScore(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const totalScore = teamData.reduce((acc, entry) => {
        const matchScore = (entry.L1sc || 0) * 3 + (entry.L2sc || 0) * 4 + (entry.L3sc || 0) * 6 + (entry.L4sc || 0) * 7; 
        return acc + matchScore;
    }, 0);

    return totalScore / teamData.length;
}

export function maxAutonomousCoralScore(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    return teamData.reduce((acc, entry) => {
        const matchScore = (entry.L1sc || 0) * 3 + (entry.L2sc || 0) * 4 + (entry.L3sc || 0) * 6 + (entry.L4sc || 0) * 7; 
        return Math.max(acc, matchScore);
    }, 0);
}

export function averageTeleopCoralScore(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const totalScore = teamData.reduce((acc, entry) => {
        const matchScore = (entry.tL1sc || 0) * 3 + (entry.tL2sc || 0) * 4 + (entry.tL3sc || 0) * 6 + (entry.tL4sc || 0) * 7;
        return acc + matchScore;
    }, 0);

    return totalScore / teamData.length;
}

export function maxTeleopCoralScore(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    return teamData.reduce((acc, entry) => {
        const matchScore = (entry.tL1sc || 0) * 3 + (entry.tL2sc || 0) * 4 + (entry.tL3sc || 0) * 6 + (entry.tL4sc || 0) * 7;
        return Math.max(acc, matchScore);
    }, 0);
}

export function averageCoralPerHeight(scoutingData, team1Number, team2Number, team3Number) {
    const averageTeam1 = [
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL1Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL2Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL3Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL4Score * 10) / 10
    ];
    const averageTeam2 = [
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL1Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL2Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL3Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL4Score * 10) / 10
    ];
    const averageTeam3 = [
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team3Number).averageL1Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team3Number).averageL2Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team3Number).averageL3Score * 10) / 10,
        Math.round(specificTeamFunctions.teleopCoralSummery(scoutingData, team3Number).averageL4Score * 10) / 10
    ];
    console.log(averageTeam1, averageTeam2, averageTeam3);
    return [averageTeam1, averageTeam2, averageTeam3];
}

export function AlgaeTeleOpAverage(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    const totalScore = teamData.reduce((acc, entry) => {
      const matchScore = (entry.tScAb || 0) + (entry.tScAp || 0); 
      return acc + matchScore;
    }, 0);
  
    return totalScore / teamData.length;
}

export function AlgaeTeleOpMax(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);
  
    if (!teamData.length) {return 0;}
  
    return teamData.reduce((acc, entry) => {
      const matchScore = (entry.tScAb || 0) + (entry.tScAp || 0); 
      return Math.max(acc, matchScore);
    }, 0);
}

export function averageClimbPoints(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const climbScoreDict = {
        'No': 0,
        'Fs': 0,
        'Fd': 0,
        'P': 1,
        'Dc': 12,
        'Sc': 6
    };

    const totalScore = teamData.reduce((acc, entry) => {
        const matchScore = (climbScoreDict[entry.epo] || 0);
        return acc + matchScore;
    }, 0);

    return totalScore / teamData.length;
}

export function maxClimbPoints(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {return 0;}

    const climbScoreDict = {
        'No': 0,
        'Fs': 0,
        'Fd': 0,
        'P': 1,
        'Dc': 12,
        'Sc': 6
    };

    return teamData.reduce((acc, entry) => {
        const matchScore = (climbScoreDict[entry.epo] || 0);
        return Math.max(acc, matchScore);
    }, 0);
}
