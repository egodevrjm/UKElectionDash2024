'use client'

import React from 'react';

const keyConstituencies = {
  "Blue Wall frontline": [
    { name: "Cheltenham", time: "3am", significance: "Conservative-held seat where Liberal Democrats are the primary challenger." },
    { name: "Godalming and Ash", time: "3.30am", significance: "Conservative-held seat where Liberal Democrats are the primary challenger." },
    { name: "Wimbledon", time: "3.45am", significance: "Conservative-held seat where Liberal Democrats are the primary challenger." },
    { name: "Taunton and Wellington", time: "4.30am", significance: "Conservative-held seat where Liberal Democrats are the primary challenger." },
    { name: "Cheadle", time: "5am", significance: "Conservative-held seat where Liberal Democrats are the primary challenger." }
  ],
  "Red Wall defences": [
    { name: "Barrow and Furness", time: "4am", significance: "Former Labour stronghold in the North, flipped by Conservatives in 2019." },
    { name: "Darlington", time: "2am", significance: "Former Labour stronghold in the North, flipped by Conservatives in 2019." },
    { name: "Rother Valley", time: "3.30am", significance: "Former Labour stronghold in the North, flipped by Conservatives in 2019." },
    { name: "Stoke–on-Trent Central", time: "5am", significance: "Former Labour stronghold in the North, flipped by Conservatives in 2019." }
  ],
  "Conservative/Leave redoubts": [
    { name: "Maldon", time: "5am", significance: "Solidly Conservative and strong Leave support." },
    { name: "Norfolk South West", time: "5.30am", significance: "Solidly Conservative and strong Leave support." },
    { name: "North Herefordshire", time: "5am", significance: "Solidly Conservative and strong Leave support." },
    { name: "Honiton and Sidmouth", time: "5am", significance: "Solidly Conservative and strong Leave support." },
    { name: "Grantham & Bourne", time: "3.45am", significance: "Solidly Conservative and strong Leave support." }
  ],
  "Conservative/Strong Leave seats": [
    { name: "Castle Point", time: "2am", significance: "Conservative seat with strong Leave support, previously Labour." },
    { name: "Clacton", time: "4am", significance: "Conservative seat with strong Leave support, previously Labour." },
    { name: "Redcar", time: "2am", significance: "Conservative seat with strong Leave support, previously Labour." },
    { name: "Broxbourne", time: "00.15am", significance: "Conservative seat with strong Leave support, previously Labour." },
    { name: "Tamworth", time: "3.45am", significance: "Conservative seat with strong Leave support, previously Labour." }
  ],
  "Diverse battlegrounds": [
    { name: "Bradford West", time: "4.30am", significance: "Labour-held with significant Asian and Muslim population." },
    { name: "Birmingham Ladywood", time: "4am", significance: "Labour-held with significant Asian and Muslim population." },
    { name: "Harrow East", time: "3.30am", significance: "Labour-held with significant Asian and Muslim population." },
    { name: "East Ham", time: "5.30am", significance: "Labour-held with significant Asian and Muslim population." },
    { name: "Oldham West, Chadderton and Royton", time: "3.30am", significance: "Labour-held with significant Asian and Muslim population." },
    { name: "Rochdale", time: "2.30am", significance: "Labour-held with significant Asian and Muslim population." },
    { name: "Leicester East", time: "2am", significance: "Labour-held with significant Asian and Muslim population." }
  ]
};

const KeyConstituencies: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Key Constituencies to Watch</h2>
      {Object.entries(keyConstituencies).map(([category, constituencies]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{category}</h3>
          <ul className="space-y-2">
            {constituencies.map((constituency, index) => (
              <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-semibold">{constituency.name}:</span> {constituency.significance} <span className="italic">({constituency.time})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KeyConstituencies;
