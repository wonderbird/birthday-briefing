/**
 * Wraps an array of vCard strings into a CardDAV multistatus XML response.
 * @param {string[]} vcards - Array of vCard strings.
 * @returns {string} The XML response string.
 */
export const createMultiStatusResponse = (vcards) => {
  const responses = vcards.map((vcard, index) => `
    <d:response>
      <d:href>/addressbooks/user/default/${index}.vcf</d:href>
      <d:propstat>
        <d:status>HTTP/1.1 200 OK</d:status>
        <d:prop>
          <d:getetag>"${index}"</d:getetag>
          <c:address-data>
${vcard}
          </c:address-data>
        </d:prop>
      </d:propstat>
    </d:response>`).join('');

  return `<?xml version="1.0" encoding="utf-8"?>
<d:multistatus xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:carddav">
${responses}
</d:multistatus>`;
};

