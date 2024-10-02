import React, { useEffect, useState } from 'react';
import BarGraphExample from '../components/charts/barChart';
import AreaGraphExample from '../components/charts/areaChart';
import PieGraphExample from '../components/charts/pieChart';
import LineGraphExample from '../components/charts/lineChart';
import RadarGraphExample from '../components/charts/radarChart';
import './Visualization.css'; 

const Visualization = () => {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);

    // Listen for changes in orientation
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

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1> 
            <div className="graph-container">
                <div className="graph-item"><BarGraphExample /></div>
                <div className="graph-item"><AreaGraphExample /></div>
                <div className="graph-item"><PieGraphExample /></div>
                <div className="graph-item"><LineGraphExample /></div>
                <div className="graph-item"><RadarGraphExample /></div>
            </div>
        </div>
    );
};

export default Visualization;
