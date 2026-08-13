/**
 * Prepify (COMSATS Abbottabad Campus) - Core Types
 */

export type ExamType =
  | 'Mid'
  | 'Terminal'
  | 'Quizzes'
  | 'Assignments'
  | 'Mid Lab'
  | 'Final Lab'
  | 'Lab Assignment';

export type PaperStatus = 'Approved' | 'Pending Verification' | 'Rejected' | 'Appealed';

export interface Department {
  id: string; // e.g. 'BCS', 'BEE', 'HUM'
  name: string; // Program code, e.g. 'BCS'
  codePrefixes: string[]; // e.g. ['CSC', 'SEN']
  instructors: string[]; // List of official instructors (Rule 1)
}

export interface Course {
  code: string; // e.g. 'CSC221'
  title: string; // e.g. 'Data Structures & Algorithms'
  departmentId: string; // e.g. 'BCS'
}

export interface PaperScanImage {
  id: string;
  pageNumber: number;
  dataUrl: string; // base64 or SVG canvas preview URL
}

export interface AIAnalysisReport {
  ocrDetectedText: string;
  matchedCourseCode: boolean;
  matchedDepartment: boolean;
  matchedInstructor: boolean;
  detectedPageCount: number;
  readabilityScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  moderationPassed: boolean;
  moderationFlags?: string[];
  rejectionReason?: string;
  tips?: string[];
  heuristic?: boolean; // True when no real AI review ran (demo/heuristic fallback)
}

export interface Paper {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  departmentId: string;
  departmentName: string;
  examType: ExamType;
  year: number;
  instructor: string;
  uploaderEmail: string;
  uploaderName: string;
  createdAt: string;
  status: PaperStatus;
  confidenceScore: number;
  readabilityScore: number;
  pageCount: number;
  images: PaperScanImage[];
  isMain: boolean; // Rule 3: Main version in clean set vs Backup scan
  parentId?: string; // If this paper is a backup version of a main paper
  aiReport: AIAnalysisReport;
  downloadsCount: number;
  appealReason?: string;
  appealedAt?: string;
}

export interface UserSession {
  email: string;
  name: string;
  departmentId?: string;
  role: 'student' | 'contributor' | 'admin';
  isAuthenticated: boolean;
}

export interface FilterState {
  searchQuery: string;
  departmentId: string;
  examType: string;
  year: string;
  instructor: string;
  showBackups: boolean;
  sortBy: 'latest' | 'readability' | 'downloads' | 'confidence';
}

export interface VerificationRequest {
  departmentId: string;
  courseCode: string;
  courseTitle: string;
  examType: ExamType;
  year: number;
  instructor: string;
  imagesBase64: string[];
}

export interface VerificationResponse {
  confidenceScore: number;
  readabilityScore: number;
  pageCount: number;
  status: PaperStatus;
  aiReport: AIAnalysisReport;
  normalizedInstructor: string;
  heuristic?: boolean;
}
