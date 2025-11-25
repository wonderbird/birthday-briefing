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

/**
 * Saves configuration to localStorage.
 * @param {Object} config - The configuration to save
 */
export function saveConfig(config) {
  const json = JSON.stringify(config);
  localStorage.setItem('birthday-briefing-config', json);
}

/**
 * Loads configuration from localStorage.
 * @returns {Object|null} - The loaded configuration, or null if not found
 */
export function loadConfig() {
  const json = localStorage.getItem('birthday-briefing-config');
  if (!json) {
    return null;
  }
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Clears configuration from localStorage.
 */
export function clearConfig() {
  localStorage.removeItem('birthday-briefing-config');
}

/**
 * Checks if a valid configuration exists in localStorage.
 * @returns {boolean} - True if valid configuration exists
 */
export function isConfigured() {
  const config = loadConfig();
  if (!config) {
    return false;
  }
  return validateConfig(config);
}

