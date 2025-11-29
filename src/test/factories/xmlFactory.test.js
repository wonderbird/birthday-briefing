import { describe, it, expect } from 'vitest';
import { createMultiStatusResponse } from './xmlFactory';
import { mockVCardPast } from '../fixtures/vcards';

describe('XML Factory', () => {
  it('should generate a valid CardDAV multistatus response', () => {
    const vcards = [mockVCardPast];
    const xml = createMultiStatusResponse(vcards);

    // Check for proper XML structure
    expect(xml).toContain('<?xml version="1.0" encoding="utf-8"?>');
    expect(xml).toContain('<d:multistatus xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:carddav">');
    expect(xml).toContain('</d:multistatus>');

    // Check for response element
    expect(xml).toContain('<d:response>');
    expect(xml).toContain('<d:href>/addressbooks/user/default/0.vcf</d:href>');
    expect(xml).toContain('<d:status>HTTP/1.1 200 OK</d:status>');
    
    // Check for vCard data inclusion
    expect(xml).toContain('<c:address-data>');
    expect(xml).toContain(mockVCardPast);
    expect(xml).toContain('</c:address-data>');
  });

  it('should handle multiple vCards', () => {
    const vcards = ['VCARD1', 'VCARD2'];
    const xml = createMultiStatusResponse(vcards);
    
    expect(xml.match(/<d:response>/g)).toHaveLength(2);
    expect(xml).toContain('VCARD1');
    expect(xml).toContain('VCARD2');
  });

  it('should handle empty array', () => {
    const xml = createMultiStatusResponse([]);
    expect(xml).toContain('<d:multistatus');
    expect(xml).not.toContain('<d:response>');
  });
});

