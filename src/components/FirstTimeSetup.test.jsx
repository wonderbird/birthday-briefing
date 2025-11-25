import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FirstTimeSetup from './FirstTimeSetup';

describe('FirstTimeSetup', () => {
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
});

