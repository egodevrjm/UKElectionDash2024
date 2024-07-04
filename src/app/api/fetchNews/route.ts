import { NextResponse } from 'next/server';
import { parseString } from 'xml2js';

export async function GET() {
  try {
    const response = await fetch('https://rss.app/feeds/ilZro6k0WX5fgR63.xml');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xml = await response.text();
    
    return new Promise((resolve, reject) => {
      parseString(xml, (err: Error | null, result: any) => {
        if (err) {
          console.error('XML parsing error:', err);
          reject(new Error('Failed to parse XML'));
        }
        
        if (!result.rss || !result.rss.channel || !result.rss.channel[0].item) {
          console.error('Unexpected RSS format:', result);
          reject(new Error('Unexpected RSS format'));
        }
        
        const items = result.rss.channel[0].item.map((item: any) => ({
          title: item.title ? item.title[0] : 'No Title',
          link: item.link ? item.link[0] : '#',
          pubDate: item.pubDate ? item.pubDate[0] : 'No Date',
          description: item.description ? item.description[0] : 'No Description'
        }));
        
        resolve(NextResponse.json(items));
      });
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}