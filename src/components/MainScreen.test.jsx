import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MainScreen from './MainScreen';
import * as storage from '../utils/storage';
import * as carddavClient from '../services/carddavClient';

// Mock the dependencies
vi.mock('../utils/storage');
vi.mock('../services/carddavClient');

describe('MainScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and display birthdays from CardDAV on mount', async () => {
    // Mock config and credentials
    vi.mocked(storage.loadConfig).mockReturnValue({
      carddavUrl: 'https://carddav.example.com',
      firstDayOfWeek: 'monday',
    });
    vi.mocked(storage.loadCredentials).mockReturnValue({
      username: 'testuser',
      password: 'testpass',
    });

    // Mock fetchBirthdays to return birthdays
    const today = new Date('2025-01-08'); // Wednesday
    vi.setSystemTime(today);

    vi.mocked(carddavClient.fetchBirthdays).mockResolvedValue([
      { name: 'Alice Smith', birthday: '--01-08' }, // Today
      { name: 'Bob Jones', birthday: '--01-10' },   // Friday
    ]);

    const onEditConfig = vi.fn();
    render(<MainScreen onEditConfig={onEditConfig} />);

    // Should show loading state initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for birthdays to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Alice Smith/)).toBeInTheDocument();
      expect(screen.getByText(/Bob Jones/)).toBeInTheDocument();
    });

    // Verify fetchBirthdays was called with correct parameters
    expect(carddavClient.fetchBirthdays).toHaveBeenCalledWith(
      'https://carddav.example.com',
      'testuser',
      'testpass',
      'monday'
    );

    vi.useRealTimers();
  });
});

