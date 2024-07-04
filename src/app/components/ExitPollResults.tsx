'use client'

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ExitPollData {
  name: string;
  seats: number;
  color: string;
}

const exitPollData: ExitPollData[] = [
  { name: 'Conservative', seats: 288, color: '#0087DC' },
  { name: 'Labour', seats: 267, color: '#DC241f' },
  { name: 'SNP', seats: 55, color: '#FDF38E' },
  { name: 'Liberal Democrats', seats: 27, color: '#FDBB30' },
  { name: 'Others', seats: 13, color: '#999999' },
];

const ExitPollResults: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Exit Poll Results</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Based on surveys conducted at polling stations across the UK.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={exitPollData}
            dataKey="seats"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => `${entry.name}: ${entry.seats}`}
          >
            {exitPollData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Note: Exit polls are predictions and may not reflect the final results.
      </p>
    </div>
  );
};

export default ExitPollResults;