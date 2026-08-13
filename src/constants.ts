import type { ExamType } from './types';

export const EXAM_TYPES: ExamType[] = ['Sessional 1', 'Sessional 2', 'Terminal'];

export const MIN_YEAR = 2018;

export const YEARS: number[] = (() => {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= MIN_YEAR; y -= 1) {
    years.push(y);
  }
  return years;
})();
