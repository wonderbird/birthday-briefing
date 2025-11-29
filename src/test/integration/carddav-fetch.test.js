import { describe, it, expect } from 'vitest';
import { mockVCardPast, mockVCardToday } from '../fixtures/vcards';

describe('CardDAV Integration', () => {
  it('should fetch and receive valid XML data from the mock server', async () => {
    // This URL matches the one intercepted in handlers.js
    const response = await fetch('https://mock-carddav-server.com/addressbooks/user/default/');
    
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/xml');
    
    const text = await response.text();
    
    // Verify standard CardDAV response structure
    expect(text).toContain('<d:multistatus');
    
    // Verify our specific test data is present
    expect(text).toContain(mockVCardPast);
    expect(text).toContain(mockVCardToday);
  });
});

