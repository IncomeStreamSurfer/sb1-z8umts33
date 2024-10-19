import React, { useState, useEffect } from 'react';
import { towns } from '../data/towns';

const TradesList = ({ trades, counties }) => {
  const [selectedTrade, setSelectedTrade] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedTown, setSelectedTown] = useState('');
  const [filteredTowns, setFilteredTowns] = useState(towns);

  useEffect(() => {
    if (selectedCounty) {
      // In a real scenario, you'd filter towns based on the selected county
      setFilteredTowns(towns.filter(town => town.county === selectedCounty));
    } else {
      setFilteredTowns(towns);
    }
  }, [selectedCounty]);

  return (
    <div>
      <h2>Find Tradespeople</h2>
      <form role="search">
        <label htmlFor="trade-select">Select a Trade:</label>
        <select id="trade-select" onChange={(e) => setSelectedTrade(e.target.value)} value={selectedTrade}>
          <option value="">All Trades</option>
          {trades.map((trade) => (
            <option key={trade} value={trade}>
              {trade}
            </option>
          ))}
        </select>

        <label htmlFor="county-select">Select a County:</label>
        <select id="county-select" onChange={(e) => setSelectedCounty(e.target.value)} value={selectedCounty}>
          <option value="">All Counties</option>
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>

        <label htmlFor="town-select">Select a Town:</label>
        <select id="town-select" onChange={(e) => setSelectedTown(e.target.value)} value={selectedTown}>
          <option value="">All Towns</option>
          {filteredTowns.map((town) => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>

        {selectedTrade && selectedCounty && selectedTown && (
          <p>
            <a href={`/${selectedTrade.toLowerCase().replace(/\s+/g, '-')}/${selectedCounty.toLowerCase().replace(/\s+/g, '-')}/${selectedTown.toLowerCase().replace(/\s+/g, '-')}`}>
              View {selectedTrade} in {selectedTown}, {selectedCounty}
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default TradesList;