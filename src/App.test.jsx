import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import * as storage from './utils/storage';

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(storage, 'isConfigured').mockReturnValue(false);
  });

  it('should check if configuration exists on mount', () => {
    render(<App />);
    
    expect(storage.isConfigured).toHaveBeenCalled();
  });
});

