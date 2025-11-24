/**
 * Formats a date as "Mon, Nov 25"
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Determines if a date is today
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is today
 */
export function isToday(date) {
  const todayDate = new Date();
  return date.getDate() === todayDate.getDate() &&
         date.getMonth() === todayDate.getMonth() &&
         date.getFullYear() === todayDate.getFullYear();
}

/**
 * Determines if a date is in the past
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is before today
 */
export function isPast(date) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  return date < todayDate;
}

/**
 * Gets CSS classes for date styling based on whether date is today or in the past
 * @param {Date} date - The date to style
 * @returns {string} CSS class names
 */
export function getDateClasses(date) {
  if (isToday(date)) {
    return 'text-primary fw-bold';
  } else if (isPast(date)) {
    return 'text-muted';
  }
  return '';
}

/**
 * Calculates the start date of the current week (Monday)
 * @param {Date} referenceDate - The reference date (defaults to today)
 * @returns {Date} The Monday of the current week at 00:00:00
 */
export function getStartOfWeek(referenceDate = new Date()) {
  const date = new Date(referenceDate);
  const currentDayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // Calculate days to subtract to get to Monday
  // If today is Sunday (0), we need to go back 6 days
  // If today is Monday (1), we need to go back 0 days
  const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - daysToMonday);
  startDate.setHours(0, 0, 0, 0);
  
  return startDate;
}

