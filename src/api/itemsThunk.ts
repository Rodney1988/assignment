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

  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error || 'Failed to fetch items';
      throw new Error(errorMessage);
    }

    // Initialize an empty object to store the items with active attributes
    const itemsWithActiveAttributes: ApiResponse = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const item = data[key] as Item;
        itemsWithActiveAttributes[key] = { ...item, active: false };
      }
    }

    // cacheData used later to merge cachedData with the redux store, if cachedData exists
    const cachedData = getCachedData<ApiResponse>('localStorage');

    // If cachedData exists, merge to the store, else just set redux store data + cache it
    let mergedItems: ApiResponse;

    if (cachedData) {
      mergedItems = { ...itemsWithActiveAttributes };

      for (const key of Object.keys(itemsWithActiveAttributes)) {
        mergedItems[key] = {
          ...itemsWithActiveAttributes[key],
          active: cachedData[key]?.active || false,
        };
      }
    } else {
      mergedItems = itemsWithActiveAttributes;
    }
    setCacheData('localStorage', mergedItems); // Cache the merged data
    return mergedItems;
  } catch (error) {
    // Fetching from API failed, attempt to use cached data
    const cachedData = getCachedData<ApiResponse>('localStorage');
    if (cachedData) {
      console.log('returning cached data', cachedData);
      return cachedData; // Return cached data if available
    }
    // If no cached data and API request fails, reject with error
    return rejectWithValue({ error: (error as Error).message });
  }
});
