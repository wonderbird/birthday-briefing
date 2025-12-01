/**
 * CardDAV client for fetching birthday data from CardDAV servers
 */

import { DAVClient } from 'tsdav';
import { getStartOfWeek } from '../utils/dateUtils.js';

/**
 * Fetches birthdays from a CardDAV server and filters to 14-day window
 * @param {string} url - The CardDAV server URL
 * @param {string} username - Authentication username
 * @param {string} password - Authentication password
 * @param {string} firstDayOfWeek - First day of week ('monday' or 'sunday')
 * @returns {Promise<Array>} Array of birthday objects with name and birthday properties within 14-day window
 */
export async function fetchBirthdays(url, username, password, firstDayOfWeek = 'monday') {
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

  // Calculate 14-day window
  const startOfWeek = getStartOfWeek();
  const endOfWindow = new Date(startOfWeek);
  endOfWindow.setDate(startOfWeek.getDate() + 13); // 14 days inclusive (0-13)

  const birthdays = [];
  
  for (const card of vCards) {
    const vCardData = card.data;
    
    // Extract Full Name (FN) and Birthday (BDAY) using regex
    const fnMatch = vCardData.match(/^FN:(.*)$/m);
    const bdayMatch = vCardData.match(/^BDAY:(.*)$/m);

    if (fnMatch && bdayMatch) {
      const name = fnMatch[1].trim();
      const birthday = bdayMatch[1].trim();
      
      // Parse birthday (format: --MM-DD or YYYY-MM-DD)
      // Extract month and day
      const bdayParts = birthday.match(/--?(\d{2})-(\d{2})/);
      if (bdayParts) {
        const month = parseInt(bdayParts[1], 10) - 1; // 0-indexed
        const day = parseInt(bdayParts[2], 10);
        
        // Create date for this year
        const currentYear = new Date().getFullYear();
        const birthdayThisYear = new Date(currentYear, month, day);
        
        // Check if birthday falls within the 14-day window
        if (birthdayThisYear >= startOfWeek && birthdayThisYear <= endOfWindow) {
          birthdays.push({ name, birthday });
        }
      }
    }
  }

  return birthdays;
}

