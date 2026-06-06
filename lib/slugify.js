/**
 * Convert a string to a URL-friendly slug
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/[^\w\-]+/g, "")   // remove non-word chars
    .replace(/\-\-+/g, "-")     // collapse multiple hyphens
    .replace(/^-+/, "")          // trim leading hyphens
    .replace(/-+$/, "");         // trim trailing hyphens
}

/**
 * Generate a unique slug by appending a timestamp if needed
 * @param {string} str
 * @returns {string}
 */
export function uniqueSlug(str) {
  return `${slugify(str)}-${Date.now()}`;
}
