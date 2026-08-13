import React, { useState } from 'react';
import {
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sparkles,
  FileText,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Paper } from '../types';
import { generatePaperPDF } from '../utils/pdfGenerator';

interface PaperViewerModalProps {
  paper: Paper | null;
  allPapers: Paper[];
  onClose: () => void;
  onSelectPaper: (p: Paper) => void;
}

export const PaperViewerModal: React.FC<PaperViewerModalProps> = ({
  paper,
  allPapers,
  onClose,
  onSelectPaper,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showAiReport, setShowAiReport] = useState(false);

  if (!paper) return null;

  // Find backup or alternate versions for the same metadata key
  const backupVersions = allPapers.filter(
    (p) =>
      p.id !== paper.id &&
      p.status === 'Approved' &&
      p.courseCode === paper.courseCode &&
      p.examType === paper.examType &&
      p.year === paper.year &&
      p.departmentId === paper.departmentId
  );

  const handleDownload = () => {
    generatePaperPDF(paper.title, paper.images, {
      courseCode: paper.courseCode,
      courseTitle: paper.courseTitle,
      departmentName: paper.departmentName,
      examType: paper.examType,
      year: paper.year,
      instructor: paper.instructor,
    });
  };

  const activeImage = paper.images[currentPage] || paper.images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-maroon text-cream">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-maroon font-extrabold text-lg">
                  {paper.courseCode}
                </span>
                <span className="text-ink font-bold text-base truncate max-w-md">
                  {paper.courseTitle}
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-cream text-taupe border border-ink/10">
                  {paper.examType} {paper.year}
                </span>
              </div>
              <p className="text-xs text-taupe mt-0.5">
                Instructor: {paper.instructor} • Dept of {paper.departmentName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAiReport(!showAiReport)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                showAiReport
                  ? 'bg-sand-dark text-cream border-sand-dark'
                  : 'bg-cream text-sand-dark border-sand/30 hover:border-sand/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Report</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-maroon hover:bg-maroon-dark text-cream font-semibold text-xs shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-taupe hover:text-ink hover:bg-ink/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-cream/40 relative">
          {/* Paper Canvas Display */}
          <div className="flex-1 flex flex-col items-center justify-between p-4 overflow-auto min-h-[450px] relative">
            {/* Top Canvas Controls Toolbar */}
            <div className="z-10 bg-white/90 backdrop-blur border border-ink/10 rounded-xl px-4 py-2 flex items-center gap-4 text-sm shadow-sm mb-3">
              <span className="text-taupe font-medium">
                Page <strong className="text-ink">{currentPage + 1}</strong> of{' '}
                <strong className="text-ink">{paper.images.length}</strong>
              </span>

              <div className="h-4 w-px bg-ink/10" />

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                  className="p-1.5 rounded text-taupe hover:text-ink hover:bg-ink/5 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-taupe w-12 text-center text-xs">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                  className="p-1.5 rounded text-taupe hover:text-ink hover:bg-ink/5 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <div className="h-4 w-px bg-ink/10" />

              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-1.5 rounded text-taupe hover:text-ink hover:bg-ink/5 flex items-center gap-1 transition-colors"
                title="Rotate 90 deg"
              >
                <RotateCw className="w-4 h-4" />
                <span>Rotate</span>
              </button>
            </div>

            {/* Image Canvas Container */}
            <div className="flex-1 flex items-center justify-center w-full overflow-auto p-2">
              {activeImage ? (
                <div
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: 'transform 0.2s ease-out',
                  }}
                  className="max-w-full max-h-[600px] shadow-2xl rounded-lg border border-ink/10 overflow-hidden bg-white"
                >
                  <img
                    src={activeImage.dataUrl}
                    alt={`Paper page ${currentPage + 1}`}
                    className="max-h-[600px] w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="text-taupe text-sm">No page image available.</div>
              )}
            </div>

            {/* Bottom Page Switcher Controls */}
            {paper.images.length > 1 && (
              <div className="mt-3 flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-ink/10 shadow-sm">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  className="p-1.5 rounded-lg border border-ink/15 text-taupe hover:text-ink disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  {paper.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        currentPage === idx
                          ? 'bg-maroon text-cream shadow-sm'
                          : 'bg-cream text-taupe hover:text-ink border border-ink/10'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === paper.images.length - 1}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(paper.images.length - 1, p + 1))
                  }
                  className="p-1.5 rounded-lg border border-ink/15 text-taupe hover:text-ink disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Side Drawer (AI Report & Alternate Backup Versions - Rule 3) */}
          {showAiReport && (
          <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-ink/10 p-5 overflow-y-auto space-y-5 shrink-0">
            {/* Rule 3 Main Set Status Badge */}
            <div
              className={`p-3.5 rounded-xl border text-sm leading-relaxed ${
                paper.isMain
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {paper.isMain ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Layers className="w-4 h-4 text-amber-500" />
                )}
                <span>
                  {paper.isMain
                    ? 'Main Version (Clean Set)'
                    : 'Alternate Backup Scan'}
                </span>
              </div>
              <p className="text-xs opacity-90">
                {paper.isMain
                  ? 'This copy was promoted to Main Set as it has the highest page/question count or highest clarity score.'
                  : 'This copy is retained as a backup scan in the repository.'}
              </p>
            </div>

            {/* AI Report Card */}
            <div className="bg-cream/50 rounded-xl p-4 border border-ink/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-taupe flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sand-dark" />
                <span>AI Gatekeeper Evaluation</span>
              </h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-ink/5">
                  <span className="text-taupe">Confidence Score</span>
                  <span className="font-bold text-maroon font-mono">
                    {paper.confidenceScore}%
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-ink/5">
                  <span className="text-taupe">OCR Readability</span>
                  <span className="font-bold text-emerald-600 font-mono">
                    {paper.readabilityScore}%
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-ink/5">
                  <span className="text-taupe">Page Count</span>
                  <span className="font-bold text-ink font-mono">
                    {paper.pageCount} Pages
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-taupe">Header OCR Match</span>
                  <span className="font-bold text-emerald-600">
                    {paper.aiReport?.matchedCourseCode ? 'Verified' : 'Partial'}
                  </span>
                </div>
              </div>

              {paper.aiReport?.ocrDetectedText && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase text-taupe block mb-1">
                    Extracted Header OCR
                  </span>
                  <p className="text-xs font-mono bg-white p-2.5 rounded text-ink/80 line-clamp-3 leading-tight border border-ink/10">
                    {paper.aiReport.ocrDetectedText}
                  </p>
                </div>
              )}
            </div>

            {/* Alternate / Backup Scans List (Rule 3) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-taupe mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sand-dark" />
                <span>
                  Alternate / Backup Scans ({backupVersions.length})
                </span>
              </h4>

              {backupVersions.length > 0 ? (
                <div className="space-y-2">
                  {backupVersions.map((bPaper) => (
                    <div
                      key={bPaper.id}
                      onClick={() => onSelectPaper(bPaper)}
                      className="p-3 bg-cream/50 border border-ink/10 rounded-xl hover:border-sand/50 cursor-pointer transition-colors text-sm space-y-1"
                    >
                      <div className="flex items-center justify-between font-semibold text-ink">
                        <span className="truncate">{bPaper.title}</span>
                        <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded text-taupe border border-ink/10">
                          {bPaper.pageCount} pgs
                        </span>
                      </div>
                      <p className="text-xs text-taupe">
                        Uploaded by {bPaper.uploaderName} • Readability {bPaper.readabilityScore}%
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-taupe italic bg-cream/40 p-3 rounded-xl border border-ink/5">
                  No duplicate/backup scans found for this paper. This is the single definitive copy.
                </p>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};
