import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, ErrorResponse, Item } from '../types';

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

    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }

    const data = await response.json();

    // Map over the fetched data to add 'active' property with
    // a default value of false
    const itemsWithActive: ApiResponse = Object.keys(data).reduce(
      (acc, key) => {
        const item = data[key] as Item;
        acc[key] = { ...item, active: false };
        return acc;
      },
      {} as ApiResponse
    );

    setCacheData('localStorage', itemsWithActive); // Cache the data
    return itemsWithActive as ApiResponse;
  } catch (error) {
    // Fetching from API failed, attempt to use cached data
    const cachedData = getCachedData<ApiResponse>('localStorage');
    if (cachedData) {
      return cachedData; // Return cached data if available
    }

    // If no cached data and API request fails, reject with error
    return rejectWithValue({ error: (error as Error).message });
  }
});
