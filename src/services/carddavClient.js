/**
 * CardDAV client for fetching birthday data from CardDAV servers
 */

import { DAVClient } from 'tsdav';

/**
 * Fetches birthdays from a CardDAV server
 * @param {string} url - The CardDAV server URL
 * @param {string} username - Authentication username
 * @param {string} password - Authentication password
 * @returns {Promise<Array>} Array of birthday objects with name and birthday properties
 */
export async function fetchBirthdays(url, username, password) {
  const client = new DAVClient({
    serverUrl: url,
    credentials: {
      username,
      password,
    },
    authMethod: 'Basic',
    defaultAccountType: 'carddav',
  });

  await client.login();

  const addressBooks = await client.fetchAddressBooks();
  
  if (addressBooks.length === 0) {
    return [];
  }

  const firstBook = addressBooks[0];
  const vCards = await client.fetchVCards({
    addressBook: firstBook,
  });

  const birthdays = [];
  
  for (const card of vCards) {
    const vCardData = card.data;
    
    // Extract Full Name (FN) and Birthday (BDAY) using regex
    const fnMatch = vCardData.match(/^FN:(.*)$/m);
    const bdayMatch = vCardData.match(/^BDAY:(.*)$/m);

    if (fnMatch && bdayMatch) {
      const name = fnMatch[1].trim();
      const birthday = bdayMatch[1].trim();
      
      birthdays.push({ name, birthday });
    }
  }

  return birthdays;
}

