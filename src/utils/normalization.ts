/**
 * Rule 4: Automatically normalize Instructor names (e.g. "DR. ALI", "dr ali" -> "Dr. Ali")
 * Rule 1: Scoping instructors to departments
 */

export function normalizeInstructorName(rawName: string): string {
  if (!rawName) return '';

  let name = rawName.trim().replace(/\s+/g, ' ');

  // Standardize common academic prefixes
  const titleMap: Record<string, string> = {
    'dr.': 'Dr.',
    'dr': 'Dr.',
    'prof.': 'Prof.',
    'prof': 'Prof.',
    'engr.': 'Engr.',
    'engr': 'Engr.',
    'sir': 'Sir',
    'miss': 'Miss',
    'ms.': 'Ms.',
    'mrs.': 'Mrs.',
    'maam': "Ma'am",
    "ma'am": "Ma'am",
  };

  const words = name.split(' ');
  const normalizedWords = words.map((word, index) => {
    const lower = word.toLowerCase();
    if (titleMap[lower]) {
      return titleMap[lower];
    }
    if (word.length === 0) return '';
    // Capitalize first letter of each name word (handles hyphens like "Nisar-Ur-Rehman")
    return word
      .split('-')
      .map((part) =>
        part.length === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      )
      .join('-');
  });

  return normalizedWords.join(' ');
}

/**
 * Fuzzy check text inclusion for Rule 2 verification
 */
export function containsFuzzy(sourceText: string, targetText: string): boolean {
  if (!sourceText || !targetText) return false;
  const source = sourceText.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = targetText.toLowerCase().replace(/[^a-z0-9]/g, '');
  return source.includes(target) || target.includes(source);
}

/**
 * Format paper title consistently
 */
export function buildPaperTitle(
  courseCode: string,
  courseTitle: string,
  examType: string,
  year: number
): string {
  return `${courseCode} ${examType} (${year}) - ${courseTitle}`;
}
