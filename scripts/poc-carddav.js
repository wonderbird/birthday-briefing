import { DAVClient } from 'tsdav';

// Configuration Constants
// Read from environment variables
const CARDDAV_URL = process.env.CARDDAV_URL;
const USERNAME = process.env.CARDDAV_USERNAME;
const PASSWORD = process.env.CARDDAV_PASSWORD;

if (!CARDDAV_URL || !USERNAME || !PASSWORD) {
  console.error('Error: Missing environment variables. Please set CARDDAV_URL, CARDDAV_USERNAME, and CARDDAV_PASSWORD.');
  process.exit(1);
}

async function main() {
  const client = new DAVClient({
    serverUrl: CARDDAV_URL,
    credentials: {
      username: USERNAME,
      password: PASSWORD,
    },
    authMethod: 'Basic', // or 'Digest'
    defaultAccountType: 'carddav',
  });

  try {
    console.log('Logging in...');
    await client.login();

    console.log('Fetching address books...');
    const addressBooks = await client.fetchAddressBooks();

    if (addressBooks.length === 0) {
      console.log('No address books found.');
      return;
    }

    const firstBook = addressBooks[0];
    console.log(`Found address book: ${firstBook.displayName}`);

    console.log('Fetching vCards...');
    const vCards = await client.fetchVCards({
      addressBook: firstBook,
    });

    console.log(`Retrieved ${vCards.length} contacts.`);
    
    vCards.forEach((card, index) => {
      const vCardData = card.data;
      
      // Simple regex to extract Full Name (FN) and Birthday (BDAY)
      const fnMatch = vCardData.match(/^FN:(.*)$/m);
      const bdayMatch = vCardData.match(/^BDAY:(.*)$/m);

      const name = fnMatch ? fnMatch[1].trim() : 'Unknown Name';
      const birthday = bdayMatch ? bdayMatch[1].trim() : 'No Birthday';

      console.log(`[${index + 1}] Name: ${name}, Birthday: ${birthday}`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
