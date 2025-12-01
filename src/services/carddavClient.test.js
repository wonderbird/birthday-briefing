import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchBirthdays } from './carddavClient.js';
import { DAVClient } from 'tsdav';

// Mock tsdav module
vi.mock('tsdav');

describe('carddavClient', () => {
  let mockLogin;
  let mockFetchAddressBooks;
  let mockFetchVCards;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Create mock functions
    mockLogin = vi.fn().mockResolvedValue(undefined);
    mockFetchAddressBooks = vi.fn().mockResolvedValue([
      { displayName: 'Test Address Book', url: '/addressbooks/user/default/' }
    ]);
    mockFetchVCards = vi.fn().mockResolvedValue([
      {
        data: 'BEGIN:VCARD\nVERSION:3.0\nFN:Alice Smith\nBDAY:1990-05-15\nEND:VCARD'
      },
      {
        data: 'BEGIN:VCARD\nVERSION:3.0\nFN:Bob Jones\nBDAY:1985-12-25\nEND:VCARD'
      }
    ]);

    // Mock DAVClient constructor and methods
    DAVClient.mockImplementation(function() {
      return {
        login: mockLogin,
        fetchAddressBooks: mockFetchAddressBooks,
        fetchVCards: mockFetchVCards,
      };
    });
  });

  describe('fetchBirthdays', () => {
    it('should be defined', () => {
      expect(fetchBirthdays).toBeDefined();
    });

    it('should fetch birthdays from CardDAV server', async () => {
      const url = 'https://carddav.example.com';
      const username = 'testuser';
      const password = 'testpass';

      const birthdays = await fetchBirthdays(url, username, password);

      // Verify DAVClient was created with correct config
      expect(DAVClient).toHaveBeenCalledWith({
        serverUrl: url,
        credentials: {
          username,
          password,
        },
        authMethod: 'Basic',
        defaultAccountType: 'carddav',
      });

      // Verify methods were called
      expect(mockLogin).toHaveBeenCalled();
      expect(mockFetchAddressBooks).toHaveBeenCalled();
      expect(mockFetchVCards).toHaveBeenCalled();

      // Verify returned birthdays
      expect(Array.isArray(birthdays)).toBe(true);
      expect(birthdays.length).toBe(2);
      
      expect(birthdays[0]).toEqual({ name: 'Alice Smith', birthday: '1990-05-15' });
      expect(birthdays[1]).toEqual({ name: 'Bob Jones', birthday: '1985-12-25' });
    });
  });
});

