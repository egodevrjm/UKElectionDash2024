'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ElectionData {
  year: string;
  CON?: number;
  LAB?: number;
  LD?: number;
  'PC/SNP'?: number;
  Other?: number;
}

const HistoricalComparison: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<ElectionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYears, setSelectedYears] = useState<string[]>(['2019', '2017', '2015', '2010', '2005', '2001']);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const years = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedYears(years);
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch('/api/historicalResults');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ElectionData[] = await response.json();
        console.log(data); // Log data for debugging
        setHistoricalData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching historical data:', error);
        setError('Failed to fetch historical data.');
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredData = historicalData.filter(data => selectedYears.includes(data.year));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Historical Comparison</h2>
      <div className="select-container mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Select Years:</label>
        <select multiple value={selectedYears} onChange={handleYearChange} className="w-full p-2 border rounded">
          {historicalData.map(data => (
            <option key={data.year} value={data.year}>
              {data.year}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="CON" fill="#0087DC" />
          <Bar dataKey="LAB" fill="#DC241f" />
          <Bar dataKey="LD" fill="#FDBB30" />
          <Bar dataKey="PC/SNP" fill="#FDF38E" />
          <Bar dataKey="Other" fill="#999999" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalComparison;
