import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

interface ElectionRow {
  Election: string;
  Party: string;
  Seats: string;
}

type Party = 'CON' | 'LAB' | 'LD' | 'PC/SNP' | 'Other';

interface ElectionResults {
  [year: string]: {
    year: string;
    CON: number;
    LAB: number;
    LD: number;
    'PC/SNP': number;
    Other: number;
  };
}

const recentElections = ['2019', '2017', '2015', '2010', '2005', '2001']; // Specify the recent election years

export async function GET() {
  try {
    const csvFilePath = path.join(process.cwd(), 'data/ukelections.csv');
    const file = fs.readFileSync(csvFilePath, 'utf8');
    
    const parsedData = Papa.parse<ElectionRow>(file, {
      header: true,
      skipEmptyLines: true,
    }).data;

    console.log('Parsed Data:', parsedData); // Log the parsed data for debugging

    // Initialize election results for each year
    const electionResults: ElectionResults = recentElections.reduce<ElectionResults>((acc, year) => {
      acc[year] = { year, CON: 0, LAB: 0, LD: 0, 'PC/SNP': 0, Other: 0 };
      return acc;
    }, {});

    // Process data to get the required format
    parsedData.forEach(row => {
      const year = row.Election;
      const party = row.Party as Party; // Assert that party is of type Party
      const seats = parseInt(row.Seats, 10);

      if (recentElections.includes(year)) { // Filter only recent elections
        if (party in electionResults[year]) {
          electionResults[year][party] += seats;
        } else {
          electionResults[year]['Other'] += seats;
        }
      }
    });

    console.log('Processed Election Results:', electionResults); // Log the processed results for debugging

    const resultArray = Object.values(electionResults);

    return NextResponse.json(resultArray);
  } catch (err) {
    console.error('Error fetching historical election data:', err);
    const error = err instanceof Error ? err : new Error('Unknown error');
    return NextResponse.json({ error: 'Failed to fetch historical data', details: error.message }, { status: 500 });
  }
}
