import { useState, useEffect } from 'react';
import { formatDate, getDateClasses } from '../utils/dateUtils';
import { loadConfig, loadCredentials } from '../utils/storage';
import { fetchBirthdays } from '../services/carddavClient';

function MainScreen({ onEditConfig }) {
  const [birthdaysInWindow, setBirthdaysInWindow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBirthdays() {
      try {
        setLoading(true);
        setError(null);

        // Load config and credentials from storage
        const config = loadConfig();
        const credentials = loadCredentials();

        if (!config || !credentials) {
          setError('Configuration or credentials not found');
          setLoading(false);
          return;
        }

        // Fetch birthdays from CardDAV
        const birthdays = await fetchBirthdays(
          config.carddavUrl,
          credentials.username,
          credentials.password,
          config.firstDayOfWeek
        );

        // Transform data format: group birthdays by date
        const birthdayMap = new Map();
        
        for (const birthday of birthdays) {
          // Parse birthday format: --MM-DD
          const match = birthday.birthday.match(/--(\d{2})-(\d{2})/);
          if (match) {
            const month = parseInt(match[1], 10) - 1; // 0-indexed
            const day = parseInt(match[2], 10);
            const currentYear = new Date().getFullYear();
            const date = new Date(currentYear, month, day);
            const dateKey = date.toISOString().split('T')[0];

            if (!birthdayMap.has(dateKey)) {
              birthdayMap.set(dateKey, { date, names: [] });
            }
            birthdayMap.get(dateKey).names.push(birthday.name);
          }
        }

        // Convert map to array and sort by date
        const grouped = Array.from(birthdayMap.values()).sort((a, b) => a.date - b.date);
        
        setBirthdaysInWindow(grouped);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch birthdays');
        setLoading(false);
      }
    }

    loadBirthdays();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8" style={{ maxWidth: '700px' }}>
          <div className="d-flex justify-content-between align-items-center my-4">
            <h1 className="mb-0">Birthday Briefing</h1>
            <button 
              type="button" 
              className="btn btn-link text-secondary" 
              onClick={onEditConfig}
              style={{ fontSize: '1.5rem', textDecoration: 'none' }}
              aria-label="Edit configuration"
            >
              ⚙
            </button>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              {loading ? (
                <p className="text-muted text-center">Loading birthdays...</p>
              ) : error ? (
                <p className="text-danger text-center">Error: {error}</p>
              ) : birthdaysInWindow.length === 0 ? (
                <p className="text-muted text-center">No birthdays in the next 14 days</p>
              ) : (
                <ul className="list-unstyled">
                  {birthdaysInWindow.map((entry, index) => (
                    <li key={index} className={`mb-2 ${getDateClasses(entry.date)}`}>
                      {formatDate(entry.date)}: {entry.names.join(', ')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;

