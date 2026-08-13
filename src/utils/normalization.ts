export function normalizeInstructorName(rawName: string): string {
  if (!rawName) return '';

  let name = rawName.trim().replace(/\s+/g, ' ');

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
    return word
      .split('-')
      .map((part) =>
        part.length === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      )
      .join('-');
  });

  return normalizedWords.join(' ');
}

export function containsFuzzy(sourceText: string, targetText: string): boolean {
  if (!sourceText || !targetText) return false;
  const source = sourceText.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = targetText.toLowerCase().replace(/[^a-z0-9]/g, '');
  return source.includes(target) || target.includes(source);
}

export function buildPaperTitle(
  courseCode: string,
  courseTitle: string,
  examType: string,
  year: number
): string {
  return `${courseCode} ${examType} (${year}) - ${courseTitle}`;
}

const STOP_WORDS = new Set([
  'and',
  'or',
  'of',
  'the',
  'a',
  'an',
  'to',
  'for',
  'with',
  'in',
  'on',
  'at',
  'into',
  'from',
]);

export function generateCourseCode(title: string): string {
  const words = title
    .replace(/&/g, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ''))
    .filter((w) => w.length > 0);

  const letters = words
    .filter((w) => !STOP_WORDS.has(w.toLowerCase()))
    .map((w) => w.charAt(0).toUpperCase())
    .join('')
    .slice(0, 4);

  return letters || 'CRS';
}
