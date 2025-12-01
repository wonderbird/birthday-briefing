import { describe, it, expect } from 'vitest';
import { fetchBirthdays } from './carddavClient.js';

describe('carddavClient', () => {
  describe('fetchBirthdays', () => {
    it('should be defined', () => {
      expect(fetchBirthdays).toBeDefined();
    });

    it('should fetch birthdays from CardDAV server', async () => {
      const url = 'https://mock-carddav-server.com/addressbooks/user/default/';
      const username = 'testuser';
      const password = 'testpass';

      const birthdays = await fetchBirthdays(url, username, password);

      expect(Array.isArray(birthdays)).toBe(true);
      expect(birthdays.length).toBeGreaterThan(0);
      
      // Verify first birthday has expected structure
      const firstBirthday = birthdays[0];
      expect(firstBirthday).toHaveProperty('name');
      expect(firstBirthday).toHaveProperty('birthday');
      expect(typeof firstBirthday.name).toBe('string');
      expect(typeof firstBirthday.birthday).toBe('string');
    });
  });
});

