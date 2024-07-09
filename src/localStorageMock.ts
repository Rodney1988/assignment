// Function to create localStorage mock
export function createLocalStorageMock() {
  // Mock localStorage
  const localStorageMock: Record<string, string> = {};

  // Mock localStorage methods
  const localStorageMockMethods = {
    getItem: (key: string) => localStorageMock[key] || null,
    setItem: (key: string, value: string) => {
      localStorageMock[key] = value;
    },
    removeItem: (key: string) => {
      delete localStorageMock[key];
    },
    clear: () => {
      Object.keys(localStorageMock).forEach(
        (key) => delete localStorageMock[key]
      );
    },
  };

  // Assign the mocked methods to global localStorage
  (globalThis as any).localStorage = localStorageMockMethods;
}
