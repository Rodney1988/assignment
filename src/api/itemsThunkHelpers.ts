import { ApiResponse } from '../types';

// Helper function for setting localstorage data
export const setCacheData = <T extends object>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Helper function for getting localstorage data
export const getCachedData = <T extends object>(key: string): T | null => {
  const cached = localStorage.getItem(key);
  if (!cached) {
    return null;
  }

  try {
    return JSON.parse(cached) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage data for key "${key}":`, error);
    return null;
  }
};

//  Transform normal data response to add active attributes that default to false
export const addActiveAttributes = (data: ApiResponse): ApiResponse => {
  const itemsWithActiveAttributes: ApiResponse = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const item = data[key];
      itemsWithActiveAttributes[key] = { ...item, active: false };
    }
  }

  return itemsWithActiveAttributes;
};

/**
 * Merges items with active attributes based on cached data.
 * @param itemsWithActiveAttributes Original items with added 'active' attribute.
 * @param cachedData Cached data from localStorage.
 * @returns Merged items with active attributes.
 */
export const mergeCachedWithActiveAtts = (
  itemsWithActiveAttributes: ApiResponse,
  cachedData: ApiResponse | null
): ApiResponse => {
  if (cachedData) {
    const mergedItems: ApiResponse = { ...itemsWithActiveAttributes };

    Object.keys(itemsWithActiveAttributes).forEach((key) => {
      mergedItems[key] = {
        ...itemsWithActiveAttributes[key],
        active: cachedData[key]?.active || false,
      };
    });

    return mergedItems;
  } else {
    return { ...itemsWithActiveAttributes };
  }
};
