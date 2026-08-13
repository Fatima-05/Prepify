import type { ExamType } from './types';

export const EXAM_TYPES: ExamType[] = [
  'Mid',
  'Terminal',
  'Quizzes',
  'Assignments',
  'Mid Lab',
  'Final Lab',
  'Lab Assignment',
];

export const MIN_YEAR = 2018;

export const YEARS: number[] = (() => {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= MIN_YEAR; y -= 1) {
    years.push(y);
  }
  return years;
})();
