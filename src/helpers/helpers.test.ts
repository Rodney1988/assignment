import { it, expect, describe, beforeEach } from 'vitest';

import { getItemDetails, updateLocalStorageActiveItem } from './helpers';
import { ApiResponse, Item } from '../types';
import { createLocalStorageMock } from '../localStorageMock';

createLocalStorageMock();

describe('updateLocalStorageActiveItem(key)', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
  });

  it('should update localStorage correctly when setting active property to true', () => {
    // Arrange
    const initialData = {
      item1: { active: false },
      item2: { active: false },
      item3: { active: false },
    };
    localStorage.setItem('localStorage', JSON.stringify(initialData));

    // Act
    updateLocalStorageActiveItem('item2');

    // Assert
    const updatedData = JSON.parse(
      localStorage.getItem('localStorage') || '{}'
    );
    expect(updatedData.item1.active).toBe(false);
    expect(updatedData.item2.active).toBe(true);
    expect(updatedData.item3.active).toBe(false);
  });

  it('should do nothing if key does not exist in localStorage', () => {
    // Arrange
    localStorage.setItem(
      'localStorage',
      JSON.stringify({ item1: { active: false } })
    );

    // Act
    updateLocalStorageActiveItem('nonexistentItem');

    // Assert
    const updatedData = JSON.parse(
      localStorage.getItem('localStorage') || '{}'
    );
    expect(updatedData.item1.active).toBe(false);
  });
});

describe('getItemDetails(itemsData, id)', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should return the item from itemsData if it exists', () => {
    // Arrange
    const itemsData: ApiResponse = {
      item1: {
        id: 'item1',
        title: 'Item 1',
        description: 'Description 1',
        image: 'image1.png',
      } as unknown as Item,
    };
    // Act
    const result = getItemDetails(itemsData, 'item1');
    // Assert
    expect(result).toEqual(itemsData.item1);
  });

  it('should return the item from localStorage if not found in itemsData', () => {
    // Arrange
    const itemsData: ApiResponse | null = null;
    const localStorageData = {
      item2: {
        id: 'item2',
        title: 'Item 2',
        description: 'Description 2',
        image: 'image2.png',
      } as unknown as Item,
    };
    localStorage.setItem('localStorage', JSON.stringify(localStorageData));
    // Act
    const result = getItemDetails(itemsData, 'item2');
    // Assert
    expect(result).toEqual(localStorageData.item2);
  });

  it('should return null if the item is not found in both itemsData and localStorage', () => {
    // Arrange
    const itemsData: ApiResponse | null = null;
    // Act
    const result = getItemDetails(itemsData, 'nonexistentItem');
    // Assert
    expect(result).toBeNull();
  });

  it('should return null if id is undefined', () => {
    // Arrange
    const itemsData: ApiResponse = {
      item1: {
        id: 'item1',
        title: 'Item 1',
        description: 'Description 1',
        image: 'image1.png',
      } as unknown as Item,
    };
    // Act
    const result = getItemDetails(itemsData, undefined);
    // Assert
    expect(result).toBeNull();
  });

  it('should handle invalid JSON in localStorage returning null', () => {
    // Arrange
    const itemsData: ApiResponse | null = null;
    localStorage.setItem('localStorage', '{ invalid json }');
    // Act
    const result = getItemDetails(itemsData, 'item1');
    // Assert
    expect(result).toBeNull();
  });
});
