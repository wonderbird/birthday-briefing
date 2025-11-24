import { describe, it, expect } from 'vitest';
import { formatDate, isToday, isPast, getDateClasses, getStartOfWeek } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('should format date in short format with weekday, month, and day', () => {
      const date = new Date(2024, 10, 25); // November 25, 2024 (month is 0-indexed)
      const formatted = formatDate(date);
      
      // The exact format might vary by locale, but should contain the key parts
      expect(formatted).toMatch(/Nov/);
      expect(formatted).toMatch(/25/);
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('isPast', () => {
    it('should return false for today', () => {
      const today = new Date();
      expect(isPast(today)).toBe(false);
    });

    it('should return true for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isPast(yesterday)).toBe(true);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isPast(tomorrow)).toBe(false);
    });
  });

  describe('getDateClasses', () => {
    it('should return primary bold classes for today', () => {
      const today = new Date();
      expect(getDateClasses(today)).toBe('text-primary fw-bold');
    });

    it('should return muted class for past dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(getDateClasses(yesterday)).toBe('text-muted');
    });

    it('should return empty string for future dates', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(getDateClasses(tomorrow)).toBe('');
    });
  });

  describe('getStartOfWeek', () => {
    it('should return Monday for a Monday date', () => {
      // November 25, 2024 is a Monday
      const monday = new Date(2024, 10, 25);
      const startOfWeek = getStartOfWeek(monday);
      
      expect(startOfWeek.getDay()).toBe(1); // Monday
      expect(startOfWeek.getDate()).toBe(25);
      expect(startOfWeek.getMonth()).toBe(10); // November
      expect(startOfWeek.getHours()).toBe(0);
      expect(startOfWeek.getMinutes()).toBe(0);
    });

    it('should return Monday for a Wednesday date', () => {
      // November 27, 2024 is a Wednesday
      const wednesday = new Date(2024, 10, 27);
      const startOfWeek = getStartOfWeek(wednesday);
      
      expect(startOfWeek.getDay()).toBe(1); // Monday
      expect(startOfWeek.getDate()).toBe(25); // Should be Nov 25 (Monday)
      expect(startOfWeek.getMonth()).toBe(10); // November
    });

    it('should return Monday for a Sunday date', () => {
      // November 24, 2024 is a Sunday
      const sunday = new Date(2024, 10, 24);
      const startOfWeek = getStartOfWeek(sunday);
      
      expect(startOfWeek.getDay()).toBe(1); // Monday
      expect(startOfWeek.getDate()).toBe(18); // Should be Nov 18 (Monday)
      expect(startOfWeek.getMonth()).toBe(10); // November
    });

    it('should set time to 00:00:00', () => {
      const date = new Date(2024, 10, 27, 15, 30, 45);
      const startOfWeek = getStartOfWeek(date);
      
      expect(startOfWeek.getHours()).toBe(0);
      expect(startOfWeek.getMinutes()).toBe(0);
      expect(startOfWeek.getSeconds()).toBe(0);
      expect(startOfWeek.getMilliseconds()).toBe(0);
    });
  });
});

