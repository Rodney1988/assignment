// Helper function to update local storage
export const updateLocalStorageActiveItem = (key: string) => {
  const itemsData = JSON.parse(localStorage.getItem('localStorage') || '{}');
  Object.keys(itemsData).forEach((itemKey) => {
    itemsData[itemKey].active = itemKey === key;
  });
  localStorage.setItem('localStorage', JSON.stringify(itemsData));
};

// Helper functions for caching
export const setCacheData = <T extends object>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCachedData = <T extends object>(key: string): T | null => {
  const cached = localStorage.getItem(key);
  return cached ? (JSON.parse(cached) as T) : null;
};
