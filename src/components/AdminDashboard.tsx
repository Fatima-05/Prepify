import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Database,
  Users,
  Search,
  Trash2,
  Check,
  Eye,
  Plus,
  Layers,
} from 'lucide-react';
import { Paper, Department, PaperStatus } from '../types';
import { normalizeInstructorName } from '../utils/normalization';

interface AdminDashboardProps {
  papers: Paper[];
  departments: Department[];
  onUpdatePaperStatus: (paperId: string, newStatus: PaperStatus, isMain?: boolean) => void;
  onToggleMainVersion: (paperId: string) => void;
  onDeletePaper: (paperId: string) => void;
  onAddInstructor: (deptId: string, instructorName: string) => void;
  onSelectPaper: (paper: Paper) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  papers,
  departments,
  onUpdatePaperStatus,
  onToggleMainVersion,
  onDeletePaper,
  onAddInstructor,
  onSelectPaper,
}) => {
  const [adminTab, setAdminTab] = useState<'appeals' | 'database' | 'instructors'>('appeals');

  const [selectedDeptForInstructor, setSelectedDeptForInstructor] = useState('BCS');
  const [newInstructorName, setNewInstructorName] = useState('');

  const [dbSearch, setDbSearch] = useState('');

  const appealedPapers = papers.filter((p) => p.status === 'Appealed');
  const approvedPapers = papers.filter((p) => p.status === 'Approved');

  const totalDownloads = papers.reduce((sum, p) => sum + (p.downloadsCount || 0), 0);
  const autoApprovalRate =
    papers.length > 0
      ? Math.round((approvedPapers.length / papers.length) * 100)
      : 100;

  const filteredDbPapers = papers.filter(
    (p) =>
      p.courseCode.toLowerCase().includes(dbSearch.toLowerCase()) ||
      p.courseTitle.toLowerCase().includes(dbSearch.toLowerCase()) ||
      p.instructor.toLowerCase().includes(dbSearch.toLowerCase()) ||
      p.uploaderEmail.toLowerCase().includes(dbSearch.toLowerCase())
  );

  const handleCreateInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstructorName.trim()) return;
    const normalized = normalizeInstructorName(newInstructorName);
    onAddInstructor(selectedDeptForInstructor, normalized);
    setNewInstructorName('');
  };

  const stats = [
    { label: 'Total Papers', value: papers.length, className: 'text-ink' },
    { label: 'Appeals Queue', value: appealedPapers.length, className: 'text-maroon' },
    { label: 'Auto-Approve Rate', value: `${autoApprovalRate}%`, className: 'text-emerald-600' },
    { label: 'Total Downloads', value: totalDownloads, className: 'text-sand-dark' },
  ];

  const subTabs = [
    { id: 'appeals' as const, label: 'Appeals Review', icon: AlertTriangle, badge: appealedPapers.length, active: 'bg-maroon text-cream', inactive: 'text-taupe hover:text-ink hover:bg-ink/5' },
    { id: 'database' as const, label: 'Paper Database', icon: Database, badge: 0, active: 'bg-maroon text-cream', inactive: 'text-taupe hover:text-ink hover:bg-ink/5' },
    { id: 'instructors' as const, label: 'Instructors & Depts', icon: Users, badge: 0, active: 'bg-maroon text-cream', inactive: 'text-taupe hover:text-ink hover:bg-ink/5' },
  ];

  const inputClass =
    'w-full bg-cream/40 border border-ink/15 rounded-lg px-3.5 py-2.5 text-sm font-medium text-ink placeholder-taupe focus:outline-none focus:ring-2 focus:ring-sand focus:border-transparent transition-shadow';

  return (
    <div className="space-y-6">
      <div className="bg-ink rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-maroon text-cream shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-cream tracking-tight">
                CUI Abbottabad Admin Control Center
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cream text-ink rounded-md">
                Admin Panel
              </span>
            </div>
            <p className="text-[13px] text-cream/60 mt-0.5">
              Review appealed rejections, manage faculty mappings, and enforce clean-set duplicate indexing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {stats.map((s) => (
            <div key={s.label} className="bg-cream/10 p-3 rounded-xl border border-cream/10">
              <span className="text-cream/50 block text-[10px] uppercase font-bold">
                {s.label}
              </span>
              <span className={`text-base font-extrabold font-mono ${s.className}`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-ink/10 pb-3 overflow-x-auto">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isActive ? tab.active : tab.inactive
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-maroon text-cream rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {adminTab === 'appeals' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-ink">
            Appealed Rejections
            <span className="text-xs font-normal text-taupe ml-2">
              Submissions flagged by AI Gatekeeper where contributors requested manual admin review
            </span>
          </h3>

          {appealedPapers.length === 0 ? (
            <div className="bg-white border border-ink/10 rounded-2xl p-14 text-center text-taupe space-y-3 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto opacity-80" />
              <h4 className="text-base font-bold text-ink">Appeals Queue is Empty</h4>
              <p className="text-sm">All rejected submissions have been processed or resolved.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {appealedPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white border border-maroon/15 rounded-2xl p-5 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ink/10">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-maroon font-extrabold text-base">
                          {paper.courseCode}
                        </span>
                        <span className="font-semibold text-ink text-sm">
                          {paper.courseTitle}
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-cream text-taupe rounded border border-ink/10">
                          {paper.examType} {paper.year}
                        </span>
                      </div>
                      <p className="text-xs text-taupe mt-1.5">
                        Instructor: <strong className="text-ink/80">{paper.instructor}</strong> • Contributor: {paper.uploaderEmail} ({paper.uploaderName})
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onSelectPaper(paper)}
                        className="px-3 py-2 rounded-lg border border-ink/15 text-taupe hover:text-ink text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Images</span>
                      </button>

                      <button
                        onClick={() => onUpdatePaperStatus(paper.id, 'Approved', true)}
                        className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Overrule &amp; Approve</span>
                      </button>

                      <button
                        onClick={() => onDeletePaper(paper.id)}
                        className="px-3 py-2 rounded-lg bg-maroon/5 hover:bg-maroon/10 text-maroon font-semibold text-xs flex items-center gap-1.5 border border-maroon/25 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Confirm Rejection</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-amber-600 block">
                        Contributor Appeal Statement
                      </span>
                      <p className="text-ink leading-relaxed italic text-[13px]">
                        "{paper.appealReason || 'No appeal note provided.'}"
                      </p>
                    </div>

                    <div className="bg-cream/50 border border-ink/10 p-3.5 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-taupe block">
                        AI Gatekeeper Initial Report
                      </span>
                      <div className="flex justify-between text-[13px] text-ink/80">
                        <span>Confidence: {paper.confidenceScore}%</span>
                        <span>Readability: {paper.readabilityScore}%</span>
                      </div>
                      <p className="text-taupe text-xs font-mono line-clamp-2">
                        OCR: {paper.aiReport?.ocrDetectedText}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {adminTab === 'database' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-taupe absolute left-3 top-2.5" />
              <input
                type="text"
                value={dbSearch}
                onChange={(e) => setDbSearch(e.target.value)}
                placeholder="Search by code, title, instructor, email..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-ink/15 rounded-xl text-sm text-ink placeholder-taupe focus:outline-none focus:ring-2 focus:ring-sand focus:border-transparent transition-shadow"
              />
            </div>
            <span className="text-xs text-taupe hidden sm:block">
              {filteredDbPapers.length} of {papers.length} papers
            </span>
          </div>

          <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-taupe">
                <thead className="bg-cream/60 text-taupe font-semibold uppercase text-[10px] tracking-wider border-b border-ink/10">
                  <tr>
                    <th className="p-3.5">Course / Paper</th>
                    <th className="p-3.5">Instructor</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Set Role</th>
                    <th className="p-3.5">Pages</th>
                    <th className="p-3.5">Contributor</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {filteredDbPapers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-cream/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-ink flex items-center gap-2">
                          <span className="font-mono text-maroon font-extrabold">
                            {paper.courseCode}
                          </span>
                          <span className="truncate max-w-xs">{paper.courseTitle}</span>
                        </div>
                        <span className="text-[11px] text-taupe">
                          {paper.examType} ({paper.year}) • Dept: {paper.departmentId}
                        </span>
                      </td>

                      <td className="p-3.5 font-medium text-ink/80">
                        {paper.instructor}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            paper.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : paper.status === 'Appealed'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : paper.status === 'Pending Verification'
                              ? 'bg-sky-50 text-sky-700 border-sky-200'
                              : 'bg-cream text-taupe border-ink/15'
                          }`}
                        >
                          {paper.status}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => onToggleMainVersion(paper.id)}
                          title="Click to toggle Main vs Backup Set version"
                          className={`px-2 py-1 rounded text-[11px] font-semibold border flex items-center gap-1 transition-colors ${
                            paper.isMain
                              ? 'bg-maroon/5 text-maroon border-maroon/25 hover:bg-maroon/10'
                              : 'bg-cream text-taupe border-ink/15 hover:border-sand/40'
                          }`}
                        >
                          <Layers className="w-3 h-3" />
                          <span>{paper.isMain ? 'Main Set' : 'Backup Scan'}</span>
                        </button>
                      </td>

                      <td className="p-3.5 font-mono text-taupe">
                        {paper.pageCount} pgs
                      </td>

                      <td className="p-3.5 text-taupe text-[11px]">
                        {paper.uploaderEmail}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onSelectPaper(paper)}
                            className="p-1.5 rounded border border-ink/15 text-taupe hover:text-ink transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {paper.status === 'Pending Verification' && (
                            <button
                              onClick={() => onUpdatePaperStatus(paper.id, 'Approved', true)}
                              className="px-2 py-1.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[10px] flex items-center gap-1 transition-colors"
                              title="Approve paper"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                          )}

                          <button
                            onClick={() => onDeletePaper(paper.id)}
                            className="p-1.5 rounded border border-maroon/20 text-maroon hover:bg-maroon/5 transition-colors"
                            title="Delete paper"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'instructors' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-ink/10 rounded-2xl p-5 space-y-4 shadow-sm h-fit">
            <h3 className="font-bold text-ink text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-maroon" />
              <span>Add Instructor to Department Dictionary</span>
            </h3>

            <form onSubmit={handleCreateInstructor} className="space-y-3 text-sm">
              <div>
                <label className="block text-taupe font-semibold mb-1.5 text-xs">
                  Department
                </label>
                <select
                  value={selectedDeptForInstructor}
                  onChange={(e) => setSelectedDeptForInstructor(e.target.value)}
                  className={inputClass}
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-taupe font-semibold mb-1.5 text-xs">
                  Instructor Name
                </label>
                <input
                  type="text"
                  value={newInstructorName}
                  onChange={(e) => setNewInstructorName(e.target.value)}
                  placeholder="e.g. Dr. Faisal Khan"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={!newInstructorName.trim()}
                className="w-full py-2.5 bg-maroon hover:bg-maroon-dark text-cream font-semibold text-sm rounded-lg shadow-sm transition-colors disabled:opacity-40"
              >
                Add Official Instructor
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white border border-ink/10 rounded-2xl p-4 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-ink/10 pb-2.5">
                  <h4 className="font-bold text-ink text-sm">
                    {dept.name}
                  </h4>
                  <span className="text-[11px] font-mono bg-sand/10 text-sand-dark px-2 py-0.5 rounded border border-sand/25">
                    {dept.instructors.length} Instructors
                  </span>
                </div>

                <ul className="space-y-1 text-sm text-ink/80">
                  {dept.instructors.map((inst) => (
                    <li
                      key={inst}
                      className="px-3 py-2 bg-cream/50 rounded-lg border border-ink/5 flex items-center justify-between"
                    >
                      <span>{inst}</span>
                      <span className="text-[10px] text-taupe font-mono">
                        Scoped
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
