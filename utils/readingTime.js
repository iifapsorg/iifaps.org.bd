/**
 * Calculate estimated reading time for content
 * @param {string} content - HTML or plain text content
 * @param {number} wordsPerMinute - Average reading speed
 * @returns {{ minutes: number, text: string }}
 */
export function readingTime(content, wordsPerMinute = 200) {
  // Strip HTML tags if present
  const plainText = content.replace(/<[^>]*>/g, "");
  const wordCount = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return {
    minutes,
    text: `${minutes} min read`,
    wordCount,
  };
}
