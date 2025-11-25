import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FirstTimeSetup from './FirstTimeSetup';
import * as storage from '../utils/storage';

describe('FirstTimeSetup', () => {
  beforeEach(() => {
    vi.spyOn(storage, 'saveConfig').mockImplementation(() => {});
  });

  it('should pass CardDAV URL to onComplete when Save is clicked', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<FirstTimeSetup onComplete={onComplete} />);
    
    const input = screen.getByLabelText(/CardDAV URL/i);
    await user.type(input, 'https://example.com/carddav');
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        carddavUrl: 'https://example.com/carddav'
      })
    );
  });

  it('should pass firstDayOfWeek to onComplete when Save is clicked', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<FirstTimeSetup onComplete={onComplete} />);
    
    const sundayRadio = screen.getByLabelText(/Sunday/i);
    await user.click(sundayRadio);
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        firstDayOfWeek: 'sunday'
      })
    );
  });

  it('should call saveConfig with form data when Save is clicked', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<FirstTimeSetup onComplete={onComplete} />);
    
    const urlInput = screen.getByLabelText(/CardDAV URL/i);
    await user.type(urlInput, 'https://example.com/carddav');
    
    const sundayRadio = screen.getByLabelText(/Sunday/i);
    await user.click(sundayRadio);
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    
    expect(storage.saveConfig).toHaveBeenCalledWith({
      carddavUrl: 'https://example.com/carddav',
      firstDayOfWeek: 'sunday'
    });
  });
});

