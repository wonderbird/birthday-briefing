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

  it('should return false for invalid URL', () => {
    const invalidConfig = {
      carddavUrl: 'not-a-valid-url',
      firstDayOfWeek: 'monday'
    };

    const result = validateConfig(invalidConfig);

    expect(result).toBe(false);
  });

  it('should return false for invalid firstDayOfWeek', () => {
    const invalidConfig = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'tuesday'
    };

    const result = validateConfig(invalidConfig);

    expect(result).toBe(false);
  });

  it('should return false for missing carddavUrl', () => {
    const invalidConfig = {
      firstDayOfWeek: 'monday'
    };

    const result = validateConfig(invalidConfig);

    expect(result).toBe(false);
  });

  it('should return false for missing firstDayOfWeek', () => {
    const invalidConfig = {
      carddavUrl: 'https://example.com/carddav'
    };

    const result = validateConfig(invalidConfig);

    expect(result).toBe(false);
  });
});

