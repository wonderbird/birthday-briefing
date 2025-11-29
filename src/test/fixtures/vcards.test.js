import { describe, it, expect } from 'vitest';
import { mockVCardPast, mockVCardToday, mockVCardFuture, mockVCardOutside } from './vcards';

describe('vCard Fixtures', () => {
  it('should export valid vCard strings', () => {
    expect(mockVCardPast).toContain('BEGIN:VCARD');
    expect(mockVCardPast).toContain('END:VCARD');
    
    expect(mockVCardToday).toContain('BEGIN:VCARD');
    expect(mockVCardToday).toContain('END:VCARD');
    
    expect(mockVCardFuture).toContain('BEGIN:VCARD');
    expect(mockVCardFuture).toContain('END:VCARD');
    
    expect(mockVCardOutside).toContain('BEGIN:VCARD');
    expect(mockVCardOutside).toContain('END:VCARD');
  });
});

