import { http, HttpResponse } from 'msw';
import { createMultiStatusResponse } from '../test/factories/xmlFactory.js';
import { mockVCardPast, mockVCardToday, mockVCardFuture, mockVCardOutside } from '../test/fixtures/vcards.js';

export const handlers = [
  // Intercept PROPFIND/REPORT requests to the CardDAV URL
  http.all('https://mock-carddav-server.com/*', ({ request }) => {
    // In a real app, we'd check for specific REPORT/PROPFIND methods and body content.
    // For now, we just return the fixture data for any request to this mock URL.
    
    const xmlResponse = createMultiStatusResponse([
      mockVCardPast,
      mockVCardToday,
      mockVCardFuture,
      mockVCardOutside
    ]);

    return new HttpResponse(xmlResponse, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }),
];

