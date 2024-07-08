// Helper function to update local storage
export const updateLocalStorageActiveItem = (key: string) => {
  const itemsData = JSON.parse(localStorage.getItem('localStorage') || '{}');
  Object.keys(itemsData).forEach((itemKey) => {
    itemsData[itemKey].active = itemKey === key;
  });
  localStorage.setItem('localStorage', JSON.stringify(itemsData));
};
