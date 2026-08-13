import React from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  User,
  Layers,
  Sparkles,
  BookMarked,
} from 'lucide-react';
import { Paper } from '../types';
import { generatePaperPDF } from '../utils/pdfGenerator';

interface PaperCardProps {
  paper: Paper;
  onSelect: (paper: Paper) => void;
  backupCount?: number;
}

const EXAM_STYLES: Record<string, string> = {
  Terminal: 'bg-maroon/10 text-maroon border-maroon/20',
  'Sessional 1': 'bg-sand/15 text-sand-dark border-sand/30',
  'Sessional 2': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  onSelect,
  backupCount = 0,
}) => {
  const handleQuickDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    generatePaperPDF(paper.title, paper.images, {
      courseCode: paper.courseCode,
      courseTitle: paper.courseTitle,
      departmentName: paper.departmentName,
      examType: paper.examType,
      year: paper.year,
      instructor: paper.instructor,
    });
  };

  return (
    <div
      onClick={() => onSelect(paper)}
      className={`group relative bg-white border rounded-2xl p-5 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
        paper.isMain
          ? 'border-ink/10 hover:border-sand/60'
          : 'border-ink/10 bg-white/70 hover:border-sand/60'
      }`}
    >
      {/* Top badges bar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Exam Type Badge */}
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${EXAM_STYLES[paper.examType] || 'bg-ink/5 text-taupe border-ink/10'}`}
          >
            {paper.examType}
          </span>

          {/* Department Code */}
          <span className="px-2 py-1 rounded-md text-xs font-semibold bg-cream text-taupe border border-ink/10">
            {paper.departmentId}
          </span>
        </div>

        {/* AI Verification Score */}
        <div className="flex items-center gap-1 text-xs font-semibold text-sand-dark">
          <Sparkles className="w-3.5 h-3.5 text-sand" />
          <span>{paper.confidenceScore}%</span>
        </div>
      </div>

      {/* Main Course Info */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-1.5">
          <h3 className="font-mono text-lg font-extrabold text-maroon tracking-tight">
            {paper.courseCode}
          </h3>
          <span className="text-xs text-taupe font-medium">({paper.year})</span>
        </div>
        <h4 className="text-[15px] font-semibold text-ink leading-snug line-clamp-2">
          {paper.courseTitle}
        </h4>
      </div>

      {/* Rule 3 status */}
      <div className="mb-4 flex items-center gap-1.5">
        {paper.isMain ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Main Set
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-taupe">
            <Layers className="w-3.5 h-3.5" />
            Backup Scan
          </span>
        )}
      </div>

      {/* Meta details */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-taupe mb-5 bg-cream/50 rounded-xl px-3.5 py-3">
        <div className="flex items-center gap-1.5 truncate">
          <User className="w-3.5 h-3.5 text-sand shrink-0" />
          <span className="truncate text-ink/80 font-medium">
            {paper.instructor}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-sand shrink-0" />
          <span className="text-ink/80 font-medium">{paper.year}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-sand shrink-0" />
          <span className="text-ink/80 font-medium">
            {paper.pageCount} {paper.pageCount === 1 ? 'Page' : 'Pages'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <BookMarked className="w-3.5 h-3.5 text-sand shrink-0" />
          <span className="text-ink/80 font-medium">
            Readability {paper.readabilityScore}%
          </span>
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-4 border-t border-ink/10">
        <div className="flex items-center gap-2.5">
          {backupCount > 0 && paper.isMain && (
            <span className="text-[11px] font-semibold text-sand-dark bg-sand/10 px-2 py-1 rounded-md border border-sand/20 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {backupCount} Backup {backupCount === 1 ? 'scan' : 'scans'}
            </span>
          )}
          <span className="text-xs text-taupe">
            {paper.downloadsCount} downloads
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(paper);
            }}
            className="p-2 rounded-lg border border-ink/15 text-taupe hover:text-ink hover:border-ink/30 transition-colors"
            title="Preview Paper"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={handleQuickDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-maroon hover:bg-maroon-dark text-cream font-semibold text-xs shadow-sm transition-colors"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
