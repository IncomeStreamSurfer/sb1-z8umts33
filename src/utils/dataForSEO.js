import fetch from 'node-fetch';
import { getCachedData, setCachedData } from './cache.js';

const API_LOGIN = 'hello@harborseo.ai';
const API_PASSWORD = '44c18af8fb0aee08';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const API_RATE_LIMIT = 50; // 50 requests per minute
let lastRequestTime = 0;
let requestCount = 0;

async function rateLimitedFetch(url, options) {
  const now = Date.now();
  if (now - lastRequestTime >= 60000) {
    lastRequestTime = now;
    requestCount = 0;
  }

  if (requestCount >= API_RATE_LIMIT) {
    const delay = 60000 - (now - lastRequestTime);
    await new Promise(resolve => setTimeout(resolve, delay));
    lastRequestTime = Date.now();
    requestCount = 0;
  }

  requestCount++;
  return fetch(url, options);
}

export async function fetchTradespeople(trade, location) {
  const cacheKey = `${trade}-${location}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const keyword = `${trade} in ${location}`;
  const url = 'https://api.dataforseo.com/v3/serp/google/maps/live/advanced';
  const data = [{
    keyword,
    location_code: 2372, // Ireland
    language_code: 'en',
    device: 'desktop',
    os: 'windows',
    depth: 20
  }];

  try {
    const response = await rateLimitedFetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(API_LOGIN + ':' + API_PASSWORD).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const items = result.tasks[0].result[0].items || [];

    setCachedData(cacheKey, { data: items, timestamp: Date.now() });
    return items;
  } catch (error) {
    console.error('Error fetching data from DataForSEO:', error);
    return [];
  }
}

export async function batchFetchTradespeople(queries) {
  const results = [];
  for (const query of queries) {
    const result = await fetchTradespeople(query.trade, query.location);
    results.push(result);
  }
  return results;
}