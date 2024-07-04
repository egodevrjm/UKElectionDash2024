'use client';

import './globals.css'; // Importing the CSS file

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { RefreshCcw, AlertTriangle, CheckCircle, Moon, Sun, Home, Newspaper } from 'lucide-react';
import ClientTime from './components/ClientTime';
import HistoricalComparison from './components/HistoricalComparison';
import KeyConstituencies from './components/KeyConstituencies';

// Type definitions
interface Seats {
  Lab: number;
  Con: number;
  LDem: number;
  SNP: number;
  Reform: number;
  Plaid: number;
  Green: number;
}

interface KeyEvent {
  time: string;
  event: string;
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

interface Projection {
  min: number;
  max: number;
  projected: number;
}

interface Projections {
  [key: string]: Projection;
}

// Colour map for each party
const partyColours: { [key: string]: string } = {
  Lab: '#DC241f',
  Con: '#0087DC',
  LDem: '#FDBB30',
  SNP: '#FDF38E',
  Reform: '#12B2B5',
  Plaid: '#3F8428',
  Green: '#6AB023'
};

const ElectionTracker: React.FC = () => {
  const [seats, setSeats] = useState<Seats>({
    Lab: 0,
    Con: 0,
    LDem: 0,
    SNP: 0,
    Reform: 0,
    Plaid: 0,
    Green: 0
  });
  const [keyEvents, setKeyEvents] = useState<KeyEvent[]>([]);
  const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [activeTab, setActiveTab] = useState<'results' | 'news'>('results');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/live-results');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSeats(data.seats);
        setLastUpdated(data.lastUpdated);
      } catch (error) {
        console.error('Error fetching live results:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addKeyEvent = (event: string) => {
    setKeyEvents(prev => [...prev, { time: new Date().toLocaleTimeString(), event }]);
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/fetchNews');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: NewsItem[] = await response.json();
      setNewsFeed(data);
      setNewsError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsError("Failed to fetch news. Please try again later.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSeats(prevSeats => ({
      ...prevSeats,
      [name]: parseInt(value, 10) || 0,
    }));
    setLastUpdated(new Date().toISOString());
  };

  const projections: Projections = {
    Lab: { min: 447, max: 517, projected: 484 },
    Con: { min: 34, max: 99, projected: 64 },
    LDem: { min: 49, max: 73, projected: 61 },
    SNP: { min: 3, max: 21, projected: 10 },
    Reform: { min: 1, max: 16, projected: 7 },
    Plaid: { min: 1, max: 6, projected: 3 },
    Green: { min: 1, max: 6, projected: 3 }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="p-4 max-w-7xl mx-auto bg-gray-100 dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300">UK Election Night 2024</h1>
          <div className="flex items-center space-x-4">
            <ClientTime />
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
            </button>
          </div>
        </header>

        <div className="mb-6 flex space-x-2">
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center px-4 py-2 rounded-t-lg ${
              activeTab === 'results'
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Home className="mr-2" size={18} />
            Results
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center px-4 py-2 rounded-t-lg ${
              activeTab === 'news'
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Newspaper className="mr-2" size={18} />
            News Feed
          </button>
        </div>

        {activeTab === 'results' && (
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Current Results</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(seats).map(([name, value]) => ({ name, value }))}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value">
                    {Object.entries(seats).map(([name]) => (
                      <Cell key={name} fill={partyColours[name]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Last updated: {new Date(lastUpdated).toLocaleString()}
              </p>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Add Seats</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(seats).map((party) => (
                  <div key={party} className="flex flex-col">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">{party}</label>
                    <input
                      type="number"
                      name={party}
                      value={seats[party as keyof Seats]}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <HistoricalComparison />
            </section>

            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <KeyConstituencies />
            </section>

<section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Projections vs. Results</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(projections).map(([party, proj]) => (
              <div key={party} className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <h3 className="font-semibold text-lg dark:text-white">{party}</h3>
                <div className="flex flex-col dark:text-gray-300">
                  <span>Projected: {proj.projected}</span>
                  <span>Current: {seats[party as keyof Seats]}</span>
                  <span className="flex items-center mt-2">
                    Status: 
                    {seats[party as keyof Seats] >= proj.min && seats[party as keyof Seats] <= proj.max ? (
                      <CheckCircle className="text-green-500 ml-2" />
                    ) : (
                      <AlertTriangle className="text-yellow-500 ml-2" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    )}

    {activeTab === 'news' && (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Live News Feed</h2>
          <button 
            onClick={fetchNews} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh News
          </button>
        </div>
        {newsError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {newsError}</span>
          </div>
        ) : (
          <ul className="space-y-4">
            {newsFeed.map((item, index) => (
              <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-semibold">
                  {item.title}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(item.pubDate).toLocaleString()}</p>
                <p className="mt-2 dark:text-gray-300">{item.description.replace(/<[^>]*>?/gm, '').slice(0, 150)}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
</div>
);
};

export default ElectionTracker;