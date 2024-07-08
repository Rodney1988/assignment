import { createAsyncThunk } from '@reduxjs/toolkit';

// Helper functions for caching
const setCacheData = <T extends object>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = <T extends object>(key: string): T | null => {
  const cached = localStorage.getItem(key);
  return cached ? (JSON.parse(cached) as T) : null;
};

// Attempt to fetch cached data first
const cachedData = getCachedData('localStorage');

// createAsyncThunk that handles fetching and caching
export const fetchAllItems = createAsyncThunk(
  'items/fetchAll',
  async <T extends object>(_: void, { rejectWithValue }: any) => {
    const url = 'http://54.73.73.228:4369/api/images';

    // If no cached data, fetch from API
    try {
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        if (cachedData) {
          console.log('Using cached data:', cachedData);
          return cachedData; // Return cached data if available
        }
        throw new Error('Failed to fetch items');
      }

      const data = (await response.json()) as T;
      setCacheData('localStorage', data); // Cache the data

      return data;
    } catch (error) {
      // Fetching from API failed, attempt to use cached data
      const cachedData = getCachedData<T>('localStorage');
      if (cachedData) {
        console.log('Using cached data:', cachedData);
        return cachedData; // Return cached data if available
      }

      // If no cached data and API request fails, reject with error
      return rejectWithValue({ error: (error as Error).message });
    }
  }
);
