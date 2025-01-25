// src/pages/Visualization.js
import React, { useEffect, useState } from 'react';
import './Visualization.css';
import bigConfig from '../components/chart-configs/bigConfig.json';

import BarGraph from '../components/charts/barChart';
import PieGraph from '../components/charts/pieChart';
import NumberDisplay from '../components/charts/numberDisplay';
import TableChart from '../components/charts/tableChart';
import MultiNumberDisplay from '../components/charts/MultiNumberDisplay';
import RadarGraph from '../components/charts/radarChart';

import { applyTransformations } from '../components/chart-configs/applyTransformations';
import { getScoutingData } from '../components/utils';

// EXACT same as before, only the multiSelectFilter has a slight tweak for sorting:

function renderChartByType(chartType, finalConfig) {
  switch (chartType) {
    case 'BarGraph':
      return <BarGraph config={finalConfig} />;
    case 'PieChart':
      return <PieGraph config={finalConfig} />;
    case 'NumberDisplay':
      return <NumberDisplay config={finalConfig} />;
    case 'TableChart':
      return <TableChart config={finalConfig} />;
    case 'MultiNumberDisplay':
      return <MultiNumberDisplay config={finalConfig} />;
    case 'RadarGraph':
      return <RadarGraph config={finalConfig} />;
    default:
      return <div style={{ color: 'white' }}>Unknown chartType: {chartType}</div>;
  }
}

function buildChartConfig(chartDef, data) {
  const transformed = applyTransformations(data, chartDef.transformations || []);
  return {
    data: transformed,
    ...chartDef.chartSettings
  };
}

// Our function to create initial states from the JSON
function buildInitialFilterState(config, data) {
  const state = {};
  config.pages.forEach((page) => {
    if (!page.filters) return;
    page.filters.forEach((filterDef) => {
      const sk = filterDef.stateKey;
      if (state[sk] !== undefined) return;
      if (filterDef.defaultValue !== undefined) {
        state[sk] = filterDef.defaultValue;
      } else {
        if (filterDef.filterType === 'multiSelectFilter') {
          state[sk] = [];
        } else if (filterDef.filterType === 'textFilter') {
          state[sk] = '';
        }
      }
    });
  });
  return state;
}

export default function Visualization() {
  const scoutingData = getScoutingData();
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
  const [activeTab, setActiveTab] = useState('AllTeams');
  const [openSections, setOpenSections] = useState(['general','autonomous','teleop','endgame','summary']);

  const [filterState, setFilterState] = useState(() => buildInitialFilterState(bigConfig, scoutingData));

  useEffect(() => {
    const handleOrientationChange = (e) => setIsPortrait(e.matches);
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

  function toggleSection(id) {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }
  function isSectionOpen(id) {
    return openSections.includes(id);
  }

  const pageDef = bigConfig.pages.find((p) => p.id === activeTab);
  if (!pageDef) {
    return (
      <div className="dashboard">
        <h1 className="page-title">Dashboard</h1>
        <p style={{ color: 'white' }}>Page {activeTab} not found in config.</p>
      </div>
    );
  }

  function updateFilterState(stateKey, newVal) {
    setFilterState((old) => ({ ...old, [stateKey]: newVal }));
  }

  function renderFilter(filterDef) {
    switch (filterDef.filterType) {
      case 'multiSelectFilter': {
        const uniqueValues = [...new Set(scoutingData.map((item) => item[filterDef.dataKey]))].filter(v => v != null);

        // Here is the new code for sorting:
        if (filterDef.sortValues) {
          uniqueValues.sort((a, b) => {
            // If they are numbers, compare numerically.
            // If strings, compare lexicographically.
            // Or you can just do String(...) for both.
            const A = String(a).toLowerCase();
            const B = String(b).toLowerCase();
            return A < B ? -1 : A > B ? 1 : 0;
          });
        }

        const selectedList = filterState[filterDef.stateKey] || [];

        return (
          <div className="team-selection-container" key={filterDef.stateKey}>
            {/* Title for the multi-select */}
            <label style={{ color: 'white', fontWeight: 'bold', marginBottom: 5, display: 'inline-block' }}>
              {filterDef.title}
            </label>
            <div className="team-selection-buttons">
              <button onClick={() => updateFilterState(filterDef.stateKey, uniqueValues)}>
                {filterDef.selectAllLabel || 'Select All'}
              </button>
              <button onClick={() => updateFilterState(filterDef.stateKey, [])}>
                {filterDef.deselectAllLabel || 'Deselect All'}
              </button>
            </div>
            <div className="team-selection">
              {uniqueValues.map((val) => {
                const checked = selectedList.includes(val);
                return (
                  <label key={val}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          updateFilterState(
                            filterDef.stateKey,
                            selectedList.filter((x) => x !== val)
                          );
                        } else {
                          updateFilterState(
                            filterDef.stateKey,
                            [...selectedList, val]
                          );
                        }
                      }}
                    />
                    {val}
                  </label>
                );
              })}
            </div>
          </div>
        );
      }

      case 'textFilter': {
        const val = filterState[filterDef.stateKey] || '';
        return (
          <div className="team-number-input" key={filterDef.stateKey}>
            <label htmlFor={filterDef.stateKey}>{filterDef.title}</label>
            <input
              id={filterDef.stateKey}
              type="number"
              value={val}
              onChange={(e) => updateFilterState(filterDef.stateKey, e.target.value)}
              placeholder="Enter number"
            />
          </div>
        );
      }

      default:
        return null;
    }
  }

  function applyPageFilters(pageDef, rawData) {
    let result = [...rawData];
  
    if (!pageDef.filters) return result;
  
    pageDef.filters.forEach((fd) => {
      if (fd.filterType === 'multiSelectFilter') {
        // existing logic ...
        const arr = filterState[fd.stateKey];
        if (Array.isArray(arr) && arr.length > 0) {
          result = result.filter((row) => arr.includes(row[fd.dataKey]));
        }
      }
      else if (fd.filterType === 'textFilter') {
        // new textFilter logic
        // Make sure we have a dataKey to filter on:
        if (fd.dataKey) {
          const typedValue = filterState[fd.stateKey];
          // If typedValue is not empty, we can filter:
          if (typedValue !== '' && typedValue !== undefined) {
            // Convert typedValue to number if you want a numeric match:
            const numericValue = parseInt(typedValue, 10);
            // Filter for rows that match numericValue on row[fd.dataKey]
            // Or if you need string matching, adjust accordingly
            if (!isNaN(numericValue)) {
              result = result.filter(row => row[fd.dataKey] === numericValue);
            }
          }
        }
      }
    });
  
    return result;
  }

  const finalDataForPage = applyPageFilters(pageDef, scoutingData);

  function renderSection(sec) {
    return (
      <div className="section" key={sec.id}>
        <h2 className="chart-section-title" onClick={() => toggleSection(sec.id)}>
          {sec.title} {isSectionOpen(sec.id) ? '▲' : '▼'}
        </h2>
        {isSectionOpen(sec.id) && (
          <div className="graph-container">
            {sec.charts.map((chartDef) => {
              const cfg = buildChartConfig(chartDef, finalDataForPage);
              return (
                <div className="graph-item" key={chartDef.id}>
                  {renderChartByType(chartDef.chartType, cfg)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      {/* Tabs */}
      <div className="tabs">
        {bigConfig.pages.map((pg) => (
          <button
            key={pg.id}
            className={activeTab === pg.id ? 'active-tab' : ''}
            onClick={() => setActiveTab(pg.id)}
          >
            {pg.title}
          </button>
        ))}
      </div>

      {/* Render filters */}
      {pageDef.filters && pageDef.filters.map((f) => renderFilter(f))}

      {/* Render sections */}
      {pageDef.sections && pageDef.sections.map((s) => renderSection(s))}
    </div>
  );
}
