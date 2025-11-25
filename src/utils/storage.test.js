import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { validateConfig, saveConfig, loadConfig, clearConfig, isConfigured } from './storage.js';

describe('validateConfig', () => {
  it('should return true for valid configuration with monday', () => {
    const validConfig = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'monday'
    };

    const result = validateConfig(validConfig);

    expect(result).toBe(true);
  });

  it('should return true for valid configuration with sunday', () => {
    const validConfig = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'sunday'
    };

    const result = validateConfig(validConfig);

    expect(result).toBe(true);
  });

  it('should return false for null config', () => {
    const result = validateConfig(null);

    expect(result).toBe(false);
  });

  it('should return false for non-object config', () => {
    const result = validateConfig('not an object');

    expect(result).toBe(false);
  });

  it('should return false for empty config object', () => {
    const result = validateConfig({});

    expect(result).toBe(false);
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

  it('should return false for carddavUrl of wrong type', () => {
    const invalidConfig = {
      carddavUrl: 12345,
      firstDayOfWeek: 'monday'
    };

    const result = validateConfig(invalidConfig);

    expect(result).toBe(false);
  });

  it('should return false for firstDayOfWeek of wrong type', () => {
    const invalidConfig = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 12345
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

  it('should return null when no configuration exists', () => {
    const result = loadConfig();

    expect(result).toBeNull();
  });
});

describe('clearConfig', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should remove configuration from localStorage', () => {
    const config = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'monday'
    };
    localStorage.setItem('birthday-briefing-config', JSON.stringify(config));

    clearConfig();

    const stored = localStorage.getItem('birthday-briefing-config');
    expect(stored).toBeNull();
  });
});

describe('isConfigured', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return true when valid configuration exists', () => {
    const config = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'monday'
    };
    localStorage.setItem('birthday-briefing-config', JSON.stringify(config));

    const result = isConfigured();

    expect(result).toBe(true);
  });

  it('should return false when no configuration exists', () => {
    const result = isConfigured();

    expect(result).toBe(false);
  });

  it('should return false when configuration is invalid', () => {
    const invalidConfig = {
      carddavUrl: 'not-a-valid-url',
      firstDayOfWeek: 'monday'
    };
    localStorage.setItem('birthday-briefing-config', JSON.stringify(invalidConfig));

    const result = isConfigured();

    expect(result).toBe(false);
  });
});

describe('error scenarios', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should handle corrupted data when loading config', () => {
    localStorage.setItem('birthday-briefing-config', 'invalid-json{');

    const result = loadConfig();

    expect(result).toBeNull();
  });

  it('should return false for corrupted data in isConfigured', () => {
    localStorage.setItem('birthday-briefing-config', 'invalid-json{');

    const result = isConfigured();

    expect(result).toBe(false);
  });
});

