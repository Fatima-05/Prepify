import { Department, Course, Paper } from '../types';
import { createSamplePaperDataUrl } from '../utils/pdfGenerator';

const DEPARTMENT_CODES = [
  'BCE', 'BCS', 'BDA', 'BDS', 'BEC', 'BEE', 'BEN', 'BES', 'BIT', 'BMD',
  'BML', 'BMT', 'BPY', 'BS (CE)', 'BSE', 'BSM', 'BTN', 'BTY', 'CVE', 'EEE',
  'EPE', 'ERS', 'GEO', 'HUM', 'MBA', 'MCS', 'MDS', 'MIT', 'PBT', 'PCE',
  'PCM', 'PCS', 'PCV', 'PDS', 'PEE', 'PES', 'PGO', 'PGP', 'PHM', 'PMS',
  'PMT', 'PPY', 'R05', 'RAI', 'RBA', 'RBF', 'RBT', 'RCE', 'RCM', 'RCP',
  'RCS', 'RCT', 'RCV', 'RDS', 'REC', 'REE', 'REN', 'RER', 'RES', 'RMB',
  'RMS', 'RMT', 'RPM', 'RPY', 'RSW',
];

const INSTRUCTOR_SEEDS: Record<string, string[]> = {
  BCS: [
    'Dr. Faisal Khan',
    'Dr. Ali Safaa',
    'Prof. Dr. Usman Ahmad',
    'Dr. Sadaf Tanveer',
    'Sir Waqas Malik',
    'Dr. Sajjad A. Madani',
    'Dr. Tadoon Khan',
  ],
  BEE: [
    'Dr. Shahid Khattak',
    'Dr. Muhammad Yasin',
    'Engr. Imran Khan',
    'Dr. Laiq Khan',
    'Engr. Bilal Ahmad',
  ],
  'BS (CE)': [
    'Dr. Mohammad Riyad',
    'Dr. Tayyab Zafar',
    'Engr. Farhan Ali',
    'Dr. Arshad Hussain',
  ],
  MBA: [
    'Dr. Amjad Ali',
    'Dr. Shehla Amjad',
    'Dr. Kashif Rashid',
    'Sir Asadullah Khan',
  ],
  HUM: [
    'Dr. Mushtaq Khan',
    "Ma'am Sobia",
    'Sir Rizwan Ali',
    'Dr. Sultan Mahmood',
  ],
  BMT: [
    'Dr. Madad Khan',
    'Dr. Sultan Mahmood',
    'Dr. Samiullah',
    'Dr. Muhammad Sarwar',
  ],
  PHM: [
    'Dr. Nisar-ur-Rehman',
    'Dr. Abdul Jabbar',
    'Dr. Taous Khan',
  ],
  ERS: [
    'Dr. Ishtiaq A.K. Jadoon',
    'Dr. Mohammad Umar',
    'Dr. Amjad Sabir',
  ],
};

export const INITIAL_DEPARTMENTS: Department[] = DEPARTMENT_CODES.map(
  (code) => ({
    id: code,
    name: code,
    codePrefixes: [code],
    instructors: INSTRUCTOR_SEEDS[code] || [],
  })
);

export const INITIAL_COURSES: Course[] = [
  { code: 'CSC101', title: 'Introduction to ICT', departmentId: 'BCS' },
  { code: 'CSC103', title: 'Programming Fundamentals', departmentId: 'BCS' },
  { code: 'CSC211', title: 'Object Oriented Programming', departmentId: 'BCS' },
  { code: 'CSC221', title: 'Data Structures & Algorithms', departmentId: 'BCS' },
  { code: 'CSC241', title: 'Database Systems', departmentId: 'BCS' },
  { code: 'CSC322', title: 'Operating Systems', departmentId: 'BCS' },
  { code: 'CSC339', title: 'Software Engineering', departmentId: 'BCS' },
  { code: 'CSC354', title: 'Computer Networks', departmentId: 'BCS' },
  { code: 'CSC471', title: 'Artificial Intelligence', departmentId: 'BCS' },

  { code: 'EEE111', title: 'Electric Circuits I', departmentId: 'BEE' },
  { code: 'EEE222', title: 'Digital Logic Design', departmentId: 'BEE' },
  { code: 'EEE312', title: 'Signals & Systems', departmentId: 'BEE' },
  { code: 'EEE331', title: 'Microprocessor Systems', departmentId: 'BEE' },

  { code: 'CVE101', title: 'Engineering Mechanics', departmentId: 'BS (CE)' },
  { code: 'CVE210', title: 'Fluid Mechanics', departmentId: 'BS (CE)' },
  { code: 'CVE315', title: 'Structural Analysis', departmentId: 'BS (CE)' },

  { code: 'MGT101', title: 'Principles of Management', departmentId: 'MBA' },
  { code: 'MGT201', title: 'Financial Accounting', departmentId: 'MBA' },
  { code: 'MGT350', title: 'Organizational Behavior', departmentId: 'MBA' },

  { code: 'HUM100', title: 'English Comprehension & Composition', departmentId: 'HUM' },
  { code: 'HUM110', title: 'Islamic Studies / Ethics', departmentId: 'HUM' },
  { code: 'HUM111', title: 'Pakistan Studies', departmentId: 'HUM' },

  { code: 'MTH104', title: 'Calculus & Analytical Geometry', departmentId: 'BMT' },
  { code: 'MTH231', title: 'Linear Algebra', departmentId: 'BMT' },
  { code: 'MTH242', title: 'Differential Equations', departmentId: 'BMT' },
];

export const INITIAL_PAPERS: Paper[] = [
  {
    id: 'paper-csc221-term-2023-main',
    title: 'CSC221 Terminal (2023) - Data Structures & Algorithms',
    courseCode: 'CSC221',
    courseTitle: 'Data Structures & Algorithms',
    departmentId: 'BCS',
    departmentName: 'BCS',
    examType: 'Terminal',
    year: 2023,
    instructor: 'Dr. Faisal Khan',
    uploaderEmail: 'sp21-bcs-042@cuiatd.edu.pk',
    uploaderName: 'Hamza Ahmed',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'Approved',
    confidenceScore: 96,
    readabilityScore: 92,
    pageCount: 3,
    isMain: true,
    downloadsCount: 342,
    images: [
      {
        id: 'img-1-1',
        pageNumber: 1,
        dataUrl: createSamplePaperDataUrl(
          'CSC221',
          'Data Structures & Algorithms',
          'BCS',
          'Terminal',
          2023,
          'Dr. Faisal Khan',
          1,
          3,
          [
            'Construct an AVL tree by inserting the following sequence: 14, 23, 7, 10, 33, 56, 80. Show all balance factors and rotations.',
            'Explain Dijkstra Algorithm for shortest paths. Trace graph with 6 vertices starting from node A.',
            'Compare Average vs Worst Case time complexities for QuickSort and MergeSort with recurrence relations.'
          ]
        ),
      },
      {
        id: 'img-1-2',
        pageNumber: 2,
        dataUrl: createSamplePaperDataUrl(
          'CSC221',
          'Data Structures & Algorithms',
          'BCS',
          'Terminal',
          2023,
          'Dr. Faisal Khan',
          2,
          3,
          [
            'Write C++ pseudocode for inserting a node into a Min-Heap and performing Heapify-Up.',
            'Distinguish between Breadth-First Search (BFS) and Depth-First Search (DFS) using adjacency list representation.',
            'Solve the 8-Queens problem representation using backtracking stack state.'
          ]
        ),
      },
      {
        id: 'img-1-3',
        pageNumber: 3,
        dataUrl: createSamplePaperDataUrl(
          'CSC221',
          'Data Structures & Algorithms',
          'BCS',
          'Terminal',
          2023,
          'Dr. Faisal Khan',
          3,
          3,
          [
            'Implement quadratic probing hash table for size M=11 with key values: 12, 44, 13, 88, 23, 94.',
            'Explain Red-Black tree properties and show deletion case 2 restoration.'
          ]
        ),
      },
    ],
    aiReport: {
      ocrDetectedText: 'COMSATS UNIVERSITY ISLAMABAD ABBOTTABAD CAMPUS DEPARTMENT OF COMPUTER SCIENCE TERMINAL EXAMINATION 2023 COURSE CSC221 DATA STRUCTURES INSTRUCTOR DR FAISAL KHAN',
      matchedCourseCode: true,
      matchedDepartment: true,
      matchedInstructor: true,
      detectedPageCount: 3,
      readabilityScore: 92,
      confidenceScore: 96,
      moderationPassed: true,
    },
  },

  {
    id: 'paper-csc221-term-2023-backup',
    parentId: 'paper-csc221-term-2023-main',
    title: 'CSC221 Terminal (2023) - Data Structures [Scan B]',
    courseCode: 'CSC221',
    courseTitle: 'Data Structures & Algorithms',
    departmentId: 'BCS',
    departmentName: 'BCS',
    examType: 'Terminal',
    year: 2023,
    instructor: 'Dr. Faisal Khan',
    uploaderEmail: 'fa21-bcs-019@cuiatd.edu.pk',
    uploaderName: 'Usman Ali',
    createdAt: '2024-01-10T14:20:00Z',
    status: 'Approved',
    confidenceScore: 84,
    readabilityScore: 78,
    pageCount: 2,
    isMain: false,
    downloadsCount: 45,
    images: [
      {
        id: 'img-2-1',
        pageNumber: 1,
        dataUrl: createSamplePaperDataUrl(
          'CSC221',
          'Data Structures & Algorithms',
          'BCS',
          'Terminal',
          2023,
          'Dr. Faisal Khan',
          1,
          2,
          [
            'Construct an AVL tree by inserting 14, 23, 7, 10, 33, 56, 80.',
            'Explain Dijkstra Algorithm for shortest paths.'
          ]
        ),
      },
      {
        id: 'img-2-2',
        pageNumber: 2,
        dataUrl: createSamplePaperDataUrl(
          'CSC221',
          'Data Structures & Algorithms',
          'BCS',
          'Terminal',
          2023,
          'Dr. Faisal Khan',
          2,
          2,
          [
            'Write C++ pseudocode for Min-Heap insertion.',
            'Distinguish between BFS and DFS.'
          ]
        ),
      },
    ],
    aiReport: {
      ocrDetectedText: 'COMSATS UNIVERSITY ABBOTTABAD CSC221 DATA STRUCTURES TERMINAL 2023 DR FAISAL KHAN',
      matchedCourseCode: true,
      matchedDepartment: true,
      matchedInstructor: true,
      detectedPageCount: 2,
      readabilityScore: 78,
      confidenceScore: 84,
      moderationPassed: true,
    },
  },

  {
    id: 'paper-csc103-sess1-2024-main',
    title: 'CSC103 Mid (2024) - Programming Fundamentals',
    courseCode: 'CSC103',
    courseTitle: 'Programming Fundamentals',
    departmentId: 'BCS',
    departmentName: 'BCS',
    examType: 'Mid',
    year: 2024,
    instructor: 'Dr. Ali Safaa',
    uploaderEmail: 'sp24-bcs-001@cuiatd.edu.pk',
    uploaderName: 'Ayesha Bibi',
    createdAt: '2024-03-20T09:15:00Z',
    status: 'Approved',
    confidenceScore: 98,
    readabilityScore: 95,
    pageCount: 2,
    isMain: true,
    downloadsCount: 189,
    images: [
      {
        id: 'img-3-1',
        pageNumber: 1,
        dataUrl: createSamplePaperDataUrl(
          'CSC103',
          'Programming Fundamentals',
          'BCS',
          'Mid',
          2024,
          'Dr. Ali Safaa',
          1,
          2,
          [
            'Write a C++ program to find whether a given integer is a Prime Number or Armstrong Number.',
            'Explain operator precedence and evaluate: result = 5 + 3 * 2 - 8 / 4 + (10 % 3).',
            'Differentiate between pass-by-value and pass-by-reference using a swap function.'
          ]
        ),
      },
      {
        id: 'img-3-2',
        pageNumber: 2,
        dataUrl: createSamplePaperDataUrl(
          'CSC103',
          'Programming Fundamentals',
          'BCS',
          'Mid',
          2024,
          'Dr. Ali Safaa',
          2,
          2,
          [
            'Dry run the nested loop snippet and write the exact output on paper.',
            'Write a program using 2D arrays to calculate row-wise sums for a 3x3 matrix.'
          ]
        ),
      },
    ],
    aiReport: {
      ocrDetectedText: 'COMSATS UNIVERSITY ABBOTTABAD DEPARTMENT OF COMPUTER SCIENCE CSC103 PROGRAMMING FUNDAMENTALS SESSIONAL 1 2024 DR ALI SAFAA',
      matchedCourseCode: true,
      matchedDepartment: true,
      matchedInstructor: true,
      detectedPageCount: 2,
      readabilityScore: 95,
      confidenceScore: 98,
      moderationPassed: true,
    },
  },

  {
    id: 'paper-eee222-term-2023-main',
    title: 'EEE222 Terminal (2023) - Digital Logic Design',
    courseCode: 'EEE222',
    courseTitle: 'Digital Logic Design',
    departmentId: 'BEE',
    departmentName: 'BEE',
    examType: 'Terminal',
    year: 2023,
    instructor: 'Dr. Shahid Khattak',
    uploaderEmail: 'sp22-eee-012@cuiatd.edu.pk',
    uploaderName: 'Zain Ul Abideen',
    createdAt: '2024-01-22T11:00:00Z',
    status: 'Approved',
    confidenceScore: 91,
    readabilityScore: 89,
    pageCount: 2,
    isMain: true,
    downloadsCount: 215,
    images: [
      {
        id: 'img-4-1',
        pageNumber: 1,
        dataUrl: createSamplePaperDataUrl(
          'EEE222',
          'Digital Logic Design',
          'BEE',
          'Terminal',
          2023,
          'Dr. Shahid Khattak',
          1,
          2,
          [
            'Minimize the Karnaugh map for F(A,B,C,D) = SUM m(0,2,5,7,8,10,13,15) with don’t care conditions d(1,9).',
            'Design a 4-bit synchronous binary up/down counter using JK Flip-Flops.',
            'Convert 4-to-1 Multiplexer into a full adder implementation.'
          ]
        ),
      },
      {
        id: 'img-4-2',
        pageNumber: 2,
        dataUrl: createSamplePaperDataUrl(
          'EEE222',
          'Digital Logic Design',
          'BEE',
          'Terminal',
          2023,
          'Dr. Shahid Khattak',
          2,
          2,
          [
            'Construct a Finite State Machine (Mealy model) for detecting sequence 1011.',
            'Compare PLA (Programmable Logic Array) vs PAL (Programmable Array Logic).'
          ]
        ),
      },
    ],
    aiReport: {
      ocrDetectedText: 'COMSATS UNIVERSITY ABBOTTABAD DEPARTMENT OF ELECTRICAL ENGINEERING EEE222 DIGITAL LOGIC DESIGN TERMINAL 2023 DR SHAHID KHATTAK',
      matchedCourseCode: true,
      matchedDepartment: true,
      matchedInstructor: true,
      detectedPageCount: 2,
      readabilityScore: 89,
      confidenceScore: 91,
      moderationPassed: true,
    },
  },

  {
    id: 'paper-mth104-sess2-2023-main',
    title: 'MTH104 Mid (2023) - Calculus & Analytical Geometry',
    courseCode: 'MTH104',
    courseTitle: 'Calculus & Analytical Geometry',
    departmentId: 'BMT',
    departmentName: 'BMT',
    examType: 'Mid',
    year: 2023,
    instructor: 'Dr. Madad Khan',
    uploaderEmail: 'sp23-bcs-088@cuiatd.edu.pk',
    uploaderName: 'Sara Tariq',
    createdAt: '2023-11-14T15:45:00Z',
    status: 'Approved',
    confidenceScore: 94,
    readabilityScore: 90,
    pageCount: 2,
    isMain: true,
    downloadsCount: 290,
    images: [
      {
        id: 'img-5-1',
        pageNumber: 1,
        dataUrl: createSamplePaperDataUrl(
          'MTH104',
          'Calculus & Analytical Geometry',
          'BMT',
          'Mid',
          2023,
          'Dr. Madad Khan',
          1,
          2,
          [
            'Evaluate the definite integral of int_0^(pi/2) sin^3(x) cos^2(x) dx using reduction formulas.',
            'Find radius and interval of convergence for sum_(n=1)^infinity ((x - 3)^n) / (n * 2^n).',
            'Find Taylor series expansion of f(x) = e^(2x) centered around x = 0.'
          ]
        ),
      },
      {
        id: 'img-5-2',
        pageNumber: 2,
        dataUrl: createSamplePaperDataUrl(
          'MTH104',
          'Calculus & Analytical Geometry',
          'BMT',
          'Mid',
          2023,
          'Dr. Madad Khan',
          2,
          2,
          [
            'Compute arc length of vector curve r(t) = <2t, t^2, (1/3)t^3> for t in [0, 2].',
            'Calculate partial derivatives fx and fy for f(x,y) = x^3 * y + sin(x/y).'
          ]
        ),
      },
    ],
    aiReport: {
      ocrDetectedText: 'COMSATS ABBOTTABAD DEPARTMENT OF MATHEMATICS MTH104 CALCULUS SESSIONAL 2 2023 DR MADAD KHAN',
      matchedCourseCode: true,
      matchedDepartment: true,
      matchedInstructor: true,
      detectedPageCount: 2,
      readabilityScore: 90,
      confidenceScore: 94,
      moderationPassed: true,
    },
  },

  {
    id: 'paper-csc322-term-2023-appealed',
    title: 'CSC322 Terminal (2023) - Operating Systems [Appealed Submission]',
    courseCode: 'CSC322',
    courseTitle: 'Operating Systems',
    departmentId: 'BCS',
    departmentName: 'BCS',
    examType: 'Terminal',
    year: 2023,
    instructor: 'Dr. Sajjad A. Madani',
    uploaderEmail: 'fa21-bcs-102@cuiatd.edu.pk',
    uploaderName: 'Bilal Hassan',
    createdAt: '2024-02-01T16:20:00Z',
    status: 'Appealed',
    confidenceScore: 48,
    readabilityScore: 52,
    pageCount: 2,
    isMain: false,
    downloadsCount: 0,
    appealReason:
      'The top header was slightly cropped when taking photo in library lighting, but question 1 clearly shows "Operating Systems Terminal 2023" and Dr. Sajjad A. Madani signature stamp at bottom. Please approve.',
    appealedAt: '2024-02-01T16:25:00Z',
    images: [
      {
        id: 'img-6-1',
        pageNumber: 1,
        dataUrl: createSamplePaperDataUrl(
          'CSC322',
          'Operating Systems',
          'BCS',
          'Terminal',
          2023,
          'Dr. Sajjad A. Madani',
          1,
          2,
          [
            'Solve the Banker Algorithm deadlock avoidance for 5 processes and 3 resource types (A, B, C). Determine if state is safe.',
            'Trace FIFO, LRU, and Optimal page replacement algorithms for reference string: 7,0,1,2,0,3,0,4,2,3,0,3,2 with 3 frames.',
            'Explain process synchronization semaphores for Bounded-Buffer Producer-Consumer problem.'
          ]
        ),
      },
      {
        id: 'img-6-2',
        pageNumber: 2,
        dataUrl: createSamplePaperDataUrl(
          'CSC322',
          'Operating Systems',
          'BCS',
          'Terminal',
          2023,
          'Dr. Sajjad A. Madani',
          2,
          2,
          [
            'Compare SSTF, SCAN, and C-SCAN disk scheduling algorithms.',
            'Explain virtual memory paging architecture and TLB cache hit/miss calculations.'
          ]
        ),
      },
    ],
    aiReport: {
      ocrDetectedText: 'OPERATING SYSTEMS CSC322 TERMINAL 2023 BANKERS ALGORITHM PAGE REPLACEMENT',
      matchedCourseCode: true,
      matchedDepartment: true,
      matchedInstructor: false,
      detectedPageCount: 2,
      readabilityScore: 52,
      confidenceScore: 48,
      moderationPassed: true,
      rejectionReason:
        'AI Confidence Score was 48% (< 50% threshold). Course header was partially missing or blurred.',
      tips: [
        'Ensure the COMSATS University header and Course Code are clearly visible at top of page 1.',
        'Avoid shadows across text.',
      ],
    },
  },
];
