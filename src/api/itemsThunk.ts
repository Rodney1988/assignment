import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, ErrorResponse } from '../types';

// Helper functions for caching
const setCacheData = <T extends object>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = <T extends object>(key: string): T | null => {
  const cached = localStorage.getItem(key);
  return cached ? (JSON.parse(cached) as T) : null;
};

// createAsyncThunk that handles fetching and caching
export const fetchAllItems = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: ErrorResponse }
>('items/fetchAll', async (_, { rejectWithValue }) => {
  const url = 'http://54.73.73.228:4369/api/images';

  // Always fetch from API first
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch items');
    }

    setCacheData('localStorage', data); // Cache the data
    return data;
  } catch (error) {
    // Fetching from API failed, attempt to use cached data
    const cachedData = getCachedData<ApiResponse>('localStorage');
    if (cachedData) {
      console.log('Using cached data:', cachedData);
      return cachedData; // Return cached data if available
    }

    // If no cached data and API request fails, reject with error
    return rejectWithValue({ error: (error as Error).message });
  }
});
