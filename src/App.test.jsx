import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import * as storage from './utils/storage';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(storage, 'isConfigured').mockReturnValue(false);
    vi.spyOn(storage, 'loadConfig').mockReturnValue(null);
  });

  it('should check if configuration exists on mount', () => {
    render(<App />);
    
    expect(storage.isConfigured).toHaveBeenCalled();
  });

  it('should show FirstTimeSetup when no configuration exists', () => {
    vi.spyOn(storage, 'isConfigured').mockReturnValue(false);
    const { container } = render(<App />);
    
    expect(container.textContent).toContain('Birthday Briefing');
    expect(container.textContent).toContain('CardDAV URL');
  });

  it('should show MainScreen when configuration exists', () => {
    vi.spyOn(storage, 'isConfigured').mockReturnValue(true);
    vi.spyOn(storage, 'loadConfig').mockReturnValue({
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'monday'
    });
    const { container } = render(<App />);
    
    expect(container.textContent).toContain('Birthday Briefing');
    expect(container.textContent).not.toContain('CardDAV URL');
  });

  it('should load and store config when configuration exists', () => {
    const mockConfig = {
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'sunday'
    };
    vi.spyOn(storage, 'isConfigured').mockReturnValue(true);
    vi.spyOn(storage, 'loadConfig').mockReturnValue(mockConfig);
    
    render(<App />);
    
    // Verify config was loaded from storage
    expect(storage.loadConfig).toHaveBeenCalled();
    // Verify MainScreen is rendered (not FirstTimeSetup)
    expect(document.body.textContent).toContain('Birthday Briefing');
    expect(document.body.textContent).not.toContain('CardDAV URL');
  });
});

