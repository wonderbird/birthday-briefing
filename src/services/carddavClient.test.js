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

    it('should filter birthdays to 14-day window from start of current week', async () => {
      const today = new Date('2025-01-08'); // Wednesday
      const mondayThisWeek = new Date('2025-01-06'); // Monday of current week
      const dayBeforeWindow = new Date('2025-01-05'); // Sunday (before window)
      const lastDayOfWindow = new Date('2025-01-19'); // 14 days from Monday
      const dayAfterWindow = new Date('2025-01-20'); // After 14-day window

      // Mock vCards with birthdays at different dates
      mockFetchVCards.mockResolvedValue([
        { data: 'BEGIN:VCARD\nVERSION:3.0\nFN:Before Window\nBDAY:--01-05\nEND:VCARD' },
        { data: 'BEGIN:VCARD\nVERSION:3.0\nFN:First Day\nBDAY:--01-06\nEND:VCARD' },
        { data: 'BEGIN:VCARD\nVERSION:3.0\nFN:Today\nBDAY:--01-08\nEND:VCARD' },
        { data: 'BEGIN:VCARD\nVERSION:3.0\nFN:Last Day\nBDAY:--01-19\nEND:VCARD' },
        { data: 'BEGIN:VCARD\nVERSION:3.0\nFN:After Window\nBDAY:--01-20\nEND:VCARD' },
      ]);

      // Mock Date.now() to return our test date
      vi.setSystemTime(today);

      const birthdays = await fetchBirthdays('https://carddav.example.com', 'user', 'pass', 'monday');

      // Should only include birthdays from 01-06 to 01-19 (14 days from Monday)
      expect(birthdays.length).toBe(3);
      expect(birthdays.find(b => b.name === 'Before Window')).toBeUndefined();
      expect(birthdays.find(b => b.name === 'First Day')).toBeDefined();
      expect(birthdays.find(b => b.name === 'Today')).toBeDefined();
      expect(birthdays.find(b => b.name === 'Last Day')).toBeDefined();
      expect(birthdays.find(b => b.name === 'After Window')).toBeUndefined();

      vi.useRealTimers();
    });
  });
});

