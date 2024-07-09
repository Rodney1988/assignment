import { ApiResponse, Item } from '../types';

// Helper function to update local storage
export const updateLocalStorageActiveItem = (key: string) => {
  const itemsData = JSON.parse(localStorage.getItem('localStorage') || '{}');
  Object.keys(itemsData).forEach((itemKey) => {
    itemsData[itemKey].active = itemKey === key;
  });
  localStorage.setItem('localStorage', JSON.stringify(itemsData));
};

// Get Items for the CustomDetailCard
export const getItemDetails = (
  itemsData: ApiResponse | null,
  id: string | undefined
): Item | null => {
  if (itemsData && id && itemsData[id]) {
    return itemsData[id];
  } else {
    const storedItemsData = localStorage.getItem('localStorage');
    if (storedItemsData && id) {
      try {
        const parsedItemsData = JSON.parse(storedItemsData);
        return parsedItemsData[id] || null;
      } catch (error) {
        // In case parsing fails
        console.error('Failed to parse localStorage data:', error);
        return null;
      }
    }
  }
  return null;
};
