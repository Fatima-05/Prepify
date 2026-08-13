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
  id: string;
  name: string;
  codePrefixes: string[];
  instructors: string[];
}

export interface Course {
  code: string;
  title: string;
  departmentId: string;
}

export interface PaperScanImage {
  id: string;
  pageNumber: number;
  dataUrl: string;
}

export interface AIAnalysisReport {
  ocrDetectedText: string;
  matchedCourseCode: boolean;
  matchedDepartment: boolean;
  matchedInstructor: boolean;
  detectedPageCount: number;
  readabilityScore: number;
  confidenceScore: number;
  moderationPassed: boolean;
  moderationFlags?: string[];
  rejectionReason?: string;
  tips?: string[];
  heuristic?: boolean;
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
  isMain: boolean;
  parentId?: string;
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
