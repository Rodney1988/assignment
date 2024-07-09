import { it, expect, describe, beforeEach } from 'vitest';

import {
  addActiveAttributes,
  getCachedData,
  mergeCachedWithActiveAtts,
  setCacheData,
} from './itemsThunkHelpers';
import { createLocalStorageMock } from '../localStorageMock';
import { ApiResponse } from '../types';

createLocalStorageMock();

describe('setCacheData(key, data)', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
  });

  it('should set data into localStorage correctly', () => {
    // Arrange
    const data = { key1: 'value1', key2: 'value2' };

    // Act
    setCacheData('testKey', data);

    // Assert
    const storedData = localStorage.getItem('testKey');
    expect(storedData).toBe(JSON.stringify(data));
  });

  it('should handle empty object gracefully', () => {
    // Arrange
    const data = {};

    // Act
    setCacheData('emptyObjectKey', data);

    // Assert
    const storedData = localStorage.getItem('emptyObjectKey');
    expect(storedData).toBe(JSON.stringify(data));
  });

  it('should handle arrays gracefully', () => {
    // Arrange
    const data = [1, 2, 3];

    // Act
    setCacheData('arrayKey', data);

    // Assert
    const storedData = localStorage.getItem('arrayKey');
    expect(storedData).toBe(JSON.stringify(data));
  });
});

describe('getCacheData(key)', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
  });

  it('should return null if key does not exist in localStorage', () => {
    // Act
    const result = getCachedData('nonexistentKey');

    // Assert
    expect(result).toBe(null);
  });

  it('should retrieve and parse data correctly from localStorage', () => {
    // Arrange
    const data = { key1: 'value1', key2: 'value2' };
    localStorage.setItem('testKey', JSON.stringify(data));

    // Act
    const result = getCachedData('testKey');

    // Assert
    expect(result).toEqual(data);
  });

  it('should handle parsing errors gracefully', () => {
    // Arrange
    localStorage.setItem('invalidJsonKey', 'invalid JSON data');

    // Act
    const result = getCachedData('invalidJsonKey');

    // Assert
    expect(result).toBe(null);
  });
});

describe('addActiveAttributes(data)', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
  });

  it('should add active attributes to each item with a default value of false', () => {
    // Arrange
    const testData = {
      item1: { title: 'Item 1' },
      item2: { title: 'Item 2' },
      item3: { title: 'Item 3' },
    };

    // Act
    const result = addActiveAttributes(testData as unknown as ApiResponse);

    // Assert
    expect(result).toEqual({
      item1: { title: 'Item 1', active: false },
      item2: { title: 'Item 2', active: false },
      item3: { title: 'Item 3', active: false },
    });
  });

  it('should handle an empty input correctly', () => {
    // Arrange
    const testData = {};

    // Act
    const result = addActiveAttributes(testData);

    // Assert
    expect(result).toEqual({});
  });
});

describe('mergeCachedWithActiveAtts(itemsWithActiveAttributes, cachedData)', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
  });

  it('should merge cached data with active attributes data correctly', () => {
    // Arrange
    const itemsWithActiveAttributes = {
      item1: { title: 'item1' },
      item2: { title: 'item2' },
    };

    const cachedData = {
      item1: { title: 'item1', active: true },
      item2: { title: 'item2', active: false },
    };

    // Act
    const mergedItems = mergeCachedWithActiveAtts(
      itemsWithActiveAttributes as unknown as ApiResponse,
      cachedData as unknown as ApiResponse
    );

    // Assert
    expect(mergedItems).toEqual({
      item1: { title: 'item1', active: true },
      item2: { title: 'item2', active: false },
    });
  });

  it('should return items with active attributes if cachedData is null', () => {
    // Arrange
    const itemsWithActiveAttributes = {
      item1: { title: 'item1', active: false },
      item2: { title: 'item2', active: false },
    };

    const cachedData = null;

    // Act
    const mergedItems = mergeCachedWithActiveAtts(
      itemsWithActiveAttributes as unknown as ApiResponse,
      cachedData
    );

    // Assert
    expect(mergedItems).toEqual({
      item1: { title: 'item1', active: false },
      item2: { title: 'item2', active: false },
    });
  });
});
