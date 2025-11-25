import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateConfig } from './storage.js';

describe('validateConfig', () => {
  it('should return true for valid configuration', () => {
    const validConfig = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'monday'
    };

    const result = validateConfig(validConfig);

    expect(result).toBe(true);
  });
});

