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
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // Calculate days to subtract to get to Monday (assuming Monday = first day)
  // If today is Sunday (0), we need to go back 6 days
  // If today is Monday (1), we need to go back 0 days
  // If today is Tuesday (2), we need to go back 1 day, etc.
  const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysToMonday);
  startDate.setHours(0, 0, 0, 0);
  
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

  // Helper function to format date as "Mon, Nov 25"
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to determine if a date is today
  const isToday = (date) => {
    const todayDate = new Date();
    return date.getDate() === todayDate.getDate() &&
           date.getMonth() === todayDate.getMonth() &&
           date.getFullYear() === todayDate.getFullYear();
  };

  // Helper function to determine if a date is in the past
  const isPast = (date) => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return date < todayDate;
  };

  // Helper function to get CSS classes for date styling
  const getDateClasses = (date) => {
    if (isToday(date)) {
      return 'text-primary fw-bold';
    } else if (isPast(date)) {
      return 'text-muted';
    }
    return '';
  };

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

