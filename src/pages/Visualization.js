import React, { useEffect, useState } from 'react';
import BarGraph from '../components/charts/barChart'; 
import './Visualization.css'; 
import scoutingData from '../scouting_data_dcmp.json'; 
import AreaGraphExample from '../components/charts/areaChart';
import PieGraphExample from '../components/charts/pieChart';
import LineGraphExample from '../components/charts/lineChart';
import RadarGraphExample from '../components/charts/radarChart';

const processScoutingDataForAverage = (scoutingData) => {
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
        averageScore: Math.round((team.totalScore / team.count) * 10) / 10, 
    }));
};

const processScoutingDataForMax = (scoutingData) => {
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

const Visualization = () => {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const [activeTab, setActiveTab] = useState('AllTeams'); // State for the active tab
    const [showGeneral, setShowGeneral] = useState(true); 
    const [showAuto, setShowAuto] = useState(true); 
    const [showPostMatch, setShowPostMatch] = useState(true);

    useEffect(() => {
        const handleOrientationChange = (e) => {
            setIsPortrait(e.matches);
        };

        const mediaQuery = window.matchMedia("(orientation: portrait)");
        mediaQuery.addEventListener('change', handleOrientationChange);

        return () => mediaQuery.removeEventListener('change', handleOrientationChange);
    }, []);

    if (isPortrait) {
        return (
            <div className="rotate-message">
                <p>Please rotate your device to landscape for the best experience.</p>
            </div>
        );
    }

    const averageScoreConfig = {
        data: processScoutingDataForAverage(scoutingData),
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#3498db',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    const maxScoreConfig = {
        data: processScoutingDataForMax(scoutingData),
        scoringTypes: [
            {
                key: 'maxScore',
                label: 'Max Score',
                color: '#e74c3c',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'teamNumber',
        yKey: 'maxScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Max Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    const renderSection = () => {
        switch (activeTab) {
            case 'AllTeams':
                return (
                    <>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowGeneral(!showGeneral)}>
                                General {showGeneral ? '▲' : '▼'}
                            </h2>
                            {showGeneral && (
                                <div className="graph-container">
                                    <div className="graph-item">
                                        <BarGraph config={averageScoreConfig} />
                                    </div>
                                    <div className="graph-item">
                                        <BarGraph config={maxScoreConfig} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowAuto(!showAuto)}>
                                Auto {showAuto ? '▲' : '▼'}
                            </h2>
                            {showAuto && (
                                <div className="graph-container">
                                    <div className="graph-item"><AreaGraphExample /></div>
                                </div>
                            )}
                        </div>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowPostMatch(!showPostMatch)}>
                                PostMatch {showPostMatch ? '▲' : '▼'}
                            </h2>
                            {showPostMatch && (
                                <div className="graph-container">
                                    <div className="graph-item"><PieGraphExample /></div>
                                    <div className="graph-item"><LineGraphExample /></div>
                                    <div className="graph-item"><RadarGraphExample /></div>
                                </div>
                            )}
                        </div>
                    </>
                );
            case 'SpecificTeam':
                return (
                    <>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowAuto(!showAuto)}>
                                Auto {showAuto ? '▲' : '▼'}
                            </h2>
                            {showAuto && (
                                <div className="graph-container">
                                    <div className="graph-item"><AreaGraphExample /></div>
                                </div>
                            )}
                        </div>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowGeneral(!showGeneral)}>
                                General {showGeneral ? '▲' : '▼'}
                            </h2>
                            {showGeneral && (
                                <div className="graph-container">
                                    <div className="graph-item">
                                        <BarGraph config={averageScoreConfig} />
                                    </div>
                                    <div className="graph-item">
                                        <BarGraph config={maxScoreConfig} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowPostMatch(!showPostMatch)}>
                                PostMatch {showPostMatch ? '▲' : '▼'}
                            </h2>
                            {showPostMatch && (
                                <div className="graph-container">
                                    <div className="graph-item"><PieGraphExample /></div>
                                    <div className="graph-item"><LineGraphExample /></div>
                                    <div className="graph-item"><RadarGraphExample /></div>
                                </div>
                            )}
                        </div>
                    </>
                );
            case 'Comparison':
                return (
                    <>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowPostMatch(!showPostMatch)}>
                                PostMatch {showPostMatch ? '▲' : '▼'}
                            </h2>
                            {showPostMatch && (
                                <div className="graph-container">
                                    <div className="graph-item"><PieGraphExample /></div>
                                    <div className="graph-item"><LineGraphExample /></div>
                                    <div className="graph-item"><RadarGraphExample /></div>
                                </div>
                            )}
                        </div>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowAuto(!showAuto)}>
                                Auto {showAuto ? '▲' : '▼'}
                            </h2>
                            {showAuto && (
                                <div className="graph-container">
                                    <div className="graph-item"><AreaGraphExample /></div>
                                </div>
                            )}
                        </div>
                        <div className="section">
                            <h2 className="chart-section-title" onClick={() => setShowGeneral(!showGeneral)}>
                                General {showGeneral ? '▲' : '▼'}
                            </h2>
                            {showGeneral && (
                                <div className="graph-container">
                                    <div className="graph-item">
                                        <BarGraph config={averageScoreConfig} />
                                    </div>
                                    <div className="graph-item">
                                        <BarGraph config={maxScoreConfig} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1> 

            {/* Tabs */}
            <div className="tabs">
                <button className={activeTab === 'AllTeams' ? 'active-tab' : ''} onClick={() => setActiveTab('AllTeams')}>All Teams</button>
                <button className={activeTab === 'SpecificTeam' ? 'active-tab' : ''} onClick={() => setActiveTab('SpecificTeam')}>Specific Team</button>
                <button className={activeTab === 'Comparison' ? 'active-tab' : ''} onClick={() => setActiveTab('Comparison')}>Comparison</button>
            </div>

            {renderSection()}
        </div>
    );
};

export default Visualization;
