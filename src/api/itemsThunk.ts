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

    // Add active property default to FALSE to API response
    // Initialize an empty object to store the items with active attributes
    const itemsWithActiveAttributes: ApiResponse = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Ensure the key is actually a property of `data`
        const item = data[key] as Item;
        itemsWithActiveAttributes[key] = { ...item, active: false };
      }
    }

    setCacheData('localStorage', itemsWithActiveAttributes); // Cache the data
    return itemsWithActiveAttributes as ApiResponse;
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
