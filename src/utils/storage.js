/**
 * Validates a configuration object for Birthday Briefing.
 * @param {Object} config - The configuration to validate
 * @returns {boolean} - True if configuration is valid
 */
export function validateConfig(config) {
  if (!config || typeof config !== 'object') {
    return false;
  }

  if (!config.carddavUrl || typeof config.carddavUrl !== 'string') {
    return false;
  }

  try {
    new URL(config.carddavUrl);
  } catch {
    return false;
  }

  if (!config.firstDayOfWeek || typeof config.firstDayOfWeek !== 'string') {
    return false;
  }

  if (config.firstDayOfWeek !== 'monday' && config.firstDayOfWeek !== 'sunday') {
    return false;
  }

  return true;
}

