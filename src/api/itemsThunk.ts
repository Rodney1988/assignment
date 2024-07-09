import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, ErrorResponse } from '../types';

import {
  addActiveAttributes,
  getCachedData,
  mergeCachedWithActiveAtts,
  setCacheData,
} from './itemsThunkHelpers';

/* createAsyncThunk that handles fetching and caching */
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

    // Function addActiveAttributes updates the data ApiResponse, adds active attribute set to false
    const itemsWithActiveAttributes = addActiveAttributes(data as ApiResponse);

    const cachedData = getCachedData<ApiResponse>('localStorage');

    // Helper function below checks if cachedData exists, merge to the store,
    // else just set redux store data + cache it
    const mergedItems = mergeCachedWithActiveAtts(
      itemsWithActiveAttributes,
      cachedData
    );

    setCacheData('localStorage', mergedItems); // Cache the merged data

    return mergedItems;
  } catch (error) {
    // Fetching from API failed, attempt to return cached data
    const cachedData = getCachedData<ApiResponse>('localStorage');
    if (cachedData) {
      console.log('returning cached data', cachedData);
      return cachedData;
    }
    // If no cached data and API request fails, reject with error
    return rejectWithValue({ error: (error as Error).message });
  }
});
