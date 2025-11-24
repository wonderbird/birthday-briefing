import { formatDate, getDateClasses, getStartOfWeek } from '../utils/dateUtils';

function MainScreen({ onEditConfig }) {
  // Hardcoded birthday data: 6 people with birthdays spread across the 14-day window
  // Format: { name: string, month: number (1-12), day: number }
  const hardcodedBirthdays = [
    { name: 'Alice Johnson', month: 11, day: 22 },    // Past (2 days ago if today is Nov 24)
    { name: 'Bob Smith', month: 11, day: 24 },        // Today (if today is Nov 24)
    { name: 'Charlie Brown', month: 11, day: 26 },    // Upcoming
    { name: 'Diana Prince', month: 11, day: 26 },     // Upcoming (same day as Charlie)
    { name: 'Ethan Hunt', month: 11, day: 29 },       // Upcoming
    { name: 'Fiona Green', month: 12, day: 2 },       // Upcoming (next week)
  ];

  // Calculate the 14-day window starting from Monday of current week
  const startDate = getStartOfWeek();
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 13); // 14 days total (0-13)
  endDate.setHours(23, 59, 59, 999);

  // Filter and group birthdays that fall within the 14-day window
  const birthdaysInWindow = [];
  
  for (let i = 0; i < 14; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const matchingBirthdays = hardcodedBirthdays.filter(birthday => {
      return birthday.month === currentDate.getMonth() + 1 && 
             birthday.day === currentDate.getDate();
    });
    
    if (matchingBirthdays.length > 0) {
      birthdaysInWindow.push({
        date: new Date(currentDate),
        names: matchingBirthdays.map(b => b.name),
      });
    }
  }

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
              {birthdaysInWindow.length === 0 ? (
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

