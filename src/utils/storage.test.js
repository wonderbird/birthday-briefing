import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { validateConfig, saveConfig, loadConfig } from './storage.js';

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

describe('saveConfig', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should save valid configuration to localStorage', () => {
    const config = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'monday'
    };

    saveConfig(config);

    const stored = localStorage.getItem('birthday-briefing-config');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored);
    expect(parsed.carddavUrl).toBe('https://example.com/carddav');
    expect(parsed.firstDayOfWeek).toBe('monday');
  });
});

describe('loadConfig', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should load configuration from localStorage', () => {
    const config = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'sunday'
    };
    localStorage.setItem('birthday-briefing-config', JSON.stringify(config));

    const loaded = loadConfig();

    expect(loaded).toEqual(config);
  });
});

