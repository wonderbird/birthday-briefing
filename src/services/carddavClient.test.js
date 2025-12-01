import { describe, it, expect } from 'vitest';
import { fetchBirthdays } from './carddavClient.js';

describe('carddavClient', () => {
  describe('fetchBirthdays', () => {
    it('should be defined', () => {
      expect(fetchBirthdays).toBeDefined();
    });
  });
});

