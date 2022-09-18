/**
 * Sleep for specified amount of time.
 * 
 * @param {number} ms number of ms to sleep.
 * @returns promise evaluated when ms has passed.
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
