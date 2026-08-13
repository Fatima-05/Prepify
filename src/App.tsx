import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PaperCard } from './components/PaperCard';
import { PaperViewerModal } from './components/PaperViewerModal';
import { UploadPaperModal } from './components/UploadPaperModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Guide } from './components/Guide';
import {
  Department,
  Course,
  Paper,
  UserSession,
  FilterState,
  PaperStatus,
} from './types';
import { INITIAL_DEPARTMENTS, INITIAL_COURSES, INITIAL_PAPERS } from './data/mockData';
import { FileText, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem('cui_atd_departments_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }
    return INITIAL_DEPARTMENTS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('cui_atd_courses_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }
    return INITIAL_COURSES;
  });

  const [papers, setPapers] = useState<Paper[]>(() => {
    const saved = localStorage.getItem('cui_atd_papers_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }
    return INITIAL_PAPERS;
  });

  const [user, setUser] = useState<UserSession>(() => {
    const saved = localStorage.getItem('cui_atd_user_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }
    return {
      email: 'guest@paperhub.local',
      name: 'Guest',
      role: 'student',
      isAuthenticated: false,
    };
  });

  const [activeTab, setActiveTab] = useState<'browse' | 'upload' | 'admin' | 'guide'>('browse');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    departmentId: '',
    examType: '',
    year: '',
    instructor: '',
    showBackups: false,
    sortBy: 'latest',
  });

  const persist = (key: string, value: unknown, label: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Failed to persist ${label}:`, err);
      showToast(`Storage is full — ${label} couldn't be saved.`);
    }
  };

  useEffect(() => {
    persist('cui_atd_papers_v2', papers, 'papers');
  }, [papers]);

  useEffect(() => {
    persist('cui_atd_departments_v2', departments, 'departments');
  }, [departments]);

  useEffect(() => {
    persist('cui_atd_courses_v2', courses, 'courses');
  }, [courses]);

  useEffect(() => {
    persist('cui_atd_user_v2', user, 'user');
  }, [user]);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = setTimeout(() => setToastMessage(null), 5000);
  };

  const visiblePapers = papers.filter((paper) => {
    if (paper.status !== 'Approved') return false;

    if (!filters.showBackups && !paper.isMain) return false;

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchCode = paper.courseCode.toLowerCase().includes(q);
      const matchTitle = paper.courseTitle.toLowerCase().includes(q);
      const matchInstructor = paper.instructor.toLowerCase().includes(q);
      const matchDept = paper.departmentName.toLowerCase().includes(q) || paper.departmentId.toLowerCase().includes(q);

      if (!matchCode && !matchTitle && !matchInstructor && !matchDept) {
        return false;
      }
    }

    if (filters.departmentId && paper.departmentId !== filters.departmentId) return false;
    if (filters.examType && paper.examType !== filters.examType) return false;
    if (filters.year && paper.year.toString() !== filters.year) return false;
    if (filters.instructor && paper.instructor !== filters.instructor) return false;

    return true;
  });

  const sortedPapers = [...visiblePapers].sort((a, b) => {
    if (filters.sortBy === 'latest') return b.year - a.year;
    if (filters.sortBy === 'readability') return b.readabilityScore - a.readabilityScore;
    if (filters.sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
    if (filters.sortBy === 'confidence') return b.confidenceScore - a.confidenceScore;
    return 0;
  });

  const handlePaperUploaded = (newPaper: Paper, updatedExistingList?: Paper[]) => {
    if (updatedExistingList) {
      setPapers([newPaper, ...updatedExistingList]);
    } else {
      setPapers((prev) => [newPaper, ...prev]);
    }

    if (newPaper.status === 'Approved') {
      showToast(
        `Paper ${newPaper.courseCode} (${newPaper.examType} ${newPaper.year}) successfully approved and added to repository!`
      );
    } else if (newPaper.status === 'Appealed') {
      showToast(`Rejection appealed. Paper sent to Admin Review Queue.`);
    } else {
      showToast(`Paper submitted as Pending Verification.`);
    }

    setActiveTab('browse');
  };

  const handleUpdatePaperStatus = (
    paperId: string,
    newStatus: PaperStatus,
    isMain = true
  ) => {
    setPapers((prev) =>
      prev.map((p) =>
        p.id === paperId ? { ...p, status: newStatus, isMain } : p
      )
    );
    showToast(`Paper status updated to ${newStatus}`);
  };

  const handleToggleMainVersion = (paperId: string) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === paperId ? { ...p, isMain: !p.isMain } : p))
    );
    showToast(`Main set version updated.`);
  };

  const handleDeletePaper = (paperId: string) => {
    setPapers((prev) => prev.filter((p) => p.id !== paperId));
    showToast('Paper removed from database.');
  };

  const handleAddInstructor = (deptId: string, instructorName: string) => {
    let added = false;
    setDepartments((prev) =>
      prev.map((dept) => {
        if (dept.id === deptId) {
          const exists = dept.instructors.some(
            (i) => i.toLowerCase() === instructorName.toLowerCase()
          );
          if (exists) return dept;
          added = true;
          return {
            ...dept,
            instructors: [...dept.instructors, instructorName],
          };
        }
        return dept;
      })
    );
    if (added) {
      showToast(`Added instructor ${instructorName} to ${deptId} department.`);
    }
  };

  const handleAddCourse = (course: Course) => {
    let added = false;
    setCourses((prev) => {
      const exists = prev.some(
        (c) => c.code.toLowerCase() === course.code.toLowerCase()
      );
      if (exists) return prev;
      added = true;
      return [...prev, course];
    });
    if (added) {
      showToast(`Added course ${course.code} to the registry.`);
    }
  };

  const appealsCount = papers.filter((p) => p.status === 'Appealed').length;

  const navigateTo = (tab: 'browse' | 'upload' | 'admin' | 'guide') => {
    if (tab === 'admin' && user.role !== 'admin') {
      showToast('Admin access requires signing in as an administrator.');
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col font-sans">
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-ink text-cream px-4 py-3 rounded-xl shadow-xl border border-ink/10 text-sm font-medium flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-sand" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={navigateTo}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onLogout={() => {
          setUser({
            email: 'guest@paperhub.local',
            name: 'Guest',
            role: 'student',
            isAuthenticated: false,
          });
          setActiveTab('browse');
          showToast('Signed out.');
        }}
        appealsCount={appealsCount}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {activeTab === 'browse' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                Past Papers Repository
              </h1>
              <p className="text-sm text-taupe mt-1.5">
                Verified papers from COMSATS University Abbottabad Campus
              </p>
            </div>

            <SearchBar
              filters={filters}
              setFilters={setFilters}
              departments={departments}
              totalResults={sortedPapers.length}
            />

            {sortedPapers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPapers.map((paper) => {
                  const backupCount = papers.filter(
                    (p) =>
                      !p.isMain &&
                      p.courseCode === paper.courseCode &&
                      p.examType === paper.examType &&
                      p.year === paper.year
                  ).length;

                  return (
                    <PaperCard
                      key={paper.id}
                      paper={paper}
                      onSelect={(p) => setSelectedPaper(p)}
                      backupCount={backupCount}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-stone/40 rounded-2xl p-14 text-center text-taupe space-y-4 shadow-sm">
                <div className="w-14 h-14 mx-auto rounded-full bg-sand/15 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-sand" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-ink">No Papers Found</h3>
                  <p className="text-sm max-w-md mx-auto leading-relaxed text-taupe">
                    No verified past papers match your current filter query. Try
                    searching for "CSC", selecting a different department, or
                    upload a scan!
                  </p>
                </div>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: '',
                      departmentId: '',
                      examType: '',
                      year: '',
                      instructor: '',
                      showBackups: true,
                      sortBy: 'latest',
                    })
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-maroon hover:bg-maroon-dark text-cream font-semibold text-sm rounded-xl shadow-sm transition-colors"
                >
                  Show All Papers (Including Alternate Scans)
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'upload' && (
          <UploadPaperModal
            user={user}
            departments={departments}
            courses={courses}
            existingPapers={papers}
            onClose={() => setActiveTab('browse')}
            onPaperUploaded={handlePaperUploaded}
            onAddInstructor={handleAddInstructor}
            onAddCourse={handleAddCourse}
          />
        )}

        {activeTab === 'admin' && user.role === 'admin' && (
          <AdminDashboard
            papers={papers}
            departments={departments}
            onUpdatePaperStatus={handleUpdatePaperStatus}
            onToggleMainVersion={handleToggleMainVersion}
            onDeletePaper={handleDeletePaper}
            onAddInstructor={handleAddInstructor}
            onSelectPaper={(paper) => setSelectedPaper(paper)}
          />
        )}

        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto">
            <Guide />
          </div>
        )}
      </main>

      {selectedPaper && (
        <PaperViewerModal
          paper={selectedPaper}
          allPapers={papers}
          onClose={() => setSelectedPaper(null)}
          onSelectPaper={(p) => setSelectedPaper(p)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(authedUser) => {
            setUser(authedUser);
            setShowAuthModal(false);
            showToast(`Signed in as ${authedUser.name} (${authedUser.role})`);
          }}
        />
      )}

      <footer className="bg-ink border-t border-ink/10 py-8 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-sand" />
            <span className="font-semibold text-cream">
              Prepify (Abbottabad Campus)
            </span>
          </div>
          <p className="text-cream/60">
            Powered by Gemini AI Gatekeeper Vision • Department of Computer Science • CUI ATD
          </p>
        </div>
      </footer>
    </div>
  );
}
