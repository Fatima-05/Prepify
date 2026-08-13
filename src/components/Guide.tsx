import React from 'react';
import {
  BookOpen,
  Layers,
  Sparkles,
  Upload,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  Search,
  GraduationCap,
  ClipboardList,
  Download,
  Image,
  Info,
  Lightbulb,
} from 'lucide-react';

interface GuideSectionProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const GuideSection: React.FC<GuideSectionProps> = ({
  title,
  subtitle,
  icon,
  children,
}) => (
  <section className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-1.5">
      <div className="p-2 rounded-lg bg-maroon text-cream shrink-0">{icon}</div>
      <div>
        <h3 className="text-base font-bold text-ink">{title}</h3>
        {subtitle && <p className="text-xs text-taupe">{subtitle}</p>}
      </div>
    </div>
    <div className="mt-4">{children}</div>
  </section>
);

interface TermCardProps {
  term: string;
  definition: React.ReactNode;
  icon: React.ReactNode;
  accent: string;
}

const TermCard: React.FC<TermCardProps> = ({ term, definition, icon, accent }) => (
  <div className="bg-cream/50 border border-ink/10 rounded-xl p-4">
    <div className={`flex items-center gap-2 mb-2 ${accent}`}>
      {icon}
      <span className="font-bold text-sm text-ink">{term}</span>
    </div>
    <p className="text-[13px] text-taupe leading-relaxed">{definition}</p>
  </div>
);

export const Guide: React.FC = () => {
  const uploadSteps = [
    {
      step: '1',
      title: 'Fill in the paper details',
      body: 'Pick the department, type the course name (no need to remember course codes — they are matched or generated automatically), then select the exam type and year.',
    },
    {
      step: '2',
      title: 'Upload clear scans',
      body: 'Add photos or scans of every page, in order, page 1 first. The app compresses images automatically so uploads stay fast.',
    },
    {
      step: '3',
      title: 'AI verification',
      body: 'The AI Gatekeeper reads the header text with OCR and checks that the course, department and instructor match what you entered. It also scans for clarity.',
    },
    {
      step: '4',
      title: 'Review the result',
      body: 'You will see a verdict — Approved, Pending Verification, or Rejected. Approved papers appear in the repository immediately.',
    },
  ];

  const statuses = [
    {
      status: 'Approved',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      text: 'The AI matched the course, department and instructor with high confidence. The paper is published in the repository.',
    },
    {
      status: 'Pending Verification',
      icon: <AlertOctagon className="w-4 h-4 text-amber-500" />,
      text: 'The header matched only partially (medium confidence). The paper is held back until an admin reviews and approves it.',
    },
    {
      status: 'Rejected',
      icon: <AlertOctagon className="w-4 h-4 text-maroon" />,
      text: 'The AI could not confirm the paper — wrong course, missing header, or an unreadable/non-exam image. You can fix the scans and try again, or appeal.',
    },
    {
      status: 'Appealed',
      icon: <Lightbulb className="w-4 h-4 text-sand-dark" />,
      text: 'You disagreed with a rejection. Your paper and reason are sent to the admin queue for a manual decision.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          How Prepify Works
        </h1>
        <p className="text-sm text-taupe mt-1.5">
          A quick guide to searching, uploading, and understanding the verification system.
        </p>
      </div>

      <GuideSection
        title="What is Prepify?"
        subtitle="A verified past-papers repository"
        icon={<BookOpen className="w-5 h-5" />}
      >
        <p className="text-sm text-taupe leading-relaxed">
          Prepify stores past exam papers for COMSATS University Abbottabad
          Campus. Every upload goes through an AI check before it is published,
          so the papers you find are matched to the right course, department and
          instructor — not random documents.
        </p>
      </GuideSection>

      <GuideSection
        title="Words You'll See"
        subtitle="Understanding the terms used in the app"
        icon={<Info className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TermCard
            term="Main Version"
            accent="text-emerald-700"
            icon={<CheckCircle2 className="w-4 h-4" />}
            definition="The best, most complete scan of a paper. Only main versions show up in search results by default, so the list stays clean with one copy per paper."
          />
          <TermCard
            term="Backup Scan"
            accent="text-sand-dark"
            icon={<Layers className="w-4 h-4" />}
            definition="An alternate upload of the same paper (same course, exam and year). It is kept in the database but hidden from the default search to avoid duplicate clutter."
          />
          <TermCard
            term="Incomplete Scan"
            accent="text-amber-600"
            icon={<AlertOctagon className="w-4 h-4" />}
            definition="A backup that is missing pages compared to the main version — for example a 2-page photo of a 3-page exam. Turn on “Include Backup / Incomplete Scans” in the filters to see these."
          />
          <TermCard
            term="Course Name & Code"
            accent="text-maroon"
            icon={<ClipboardList className="w-4 h-4" />}
            definition="You only ever type the course name, e.g. “Data Structures &amp; Algorithms”. The app remembers the official code (e.g. DSA) automatically — and generates one for brand-new courses."
          />
          <TermCard
            term="Exam Type"
            accent="text-maroon"
            icon={<GraduationCap className="w-4 h-4" />}
            definition="The kind of assessment: Mid, Terminal, Quizzes, Assignments, Mid Lab, Final Lab, or Lab Assignment."
          />
          <TermCard
            term="Department / Program"
            accent="text-maroon"
            icon={<BookOpen className="w-4 h-4" />}
            definition="Shown as program codes such as BCS (BS Computer Science), BEE (Electrical), BDS (Data Science) and so on. Filters are scoped to the program you pick."
          />
          <TermCard
            term="Confidence Score"
            accent="text-maroon"
            icon={<Sparkles className="w-4 h-4" />}
            definition="How sure the AI is that the uploaded paper matches the course you selected. High = clear match, low = the header could not be confirmed."
          />
          <TermCard
            term="Readability Score"
            accent="text-emerald-700"
            icon={<Image className="w-4 h-4" />}
            definition="How clear and legible the scan is — contrast, sharpness and lighting. A readable scan is easier for the AI to verify."
          />
          <TermCard
            term="Demo Verification"
            accent="text-sand-dark"
            icon={<Sparkles className="w-4 h-4" />}
            definition="If the AI service isn't configured, the app runs an offline “demo” check instead. It is a simulation, not a real AI review, and the banner makes that clear."
          />
        </div>
      </GuideSection>

      <GuideSection
        title="How to Upload a Paper"
        subtitle="Four quick steps"
        icon={<Upload className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {uploadSteps.map((s) => (
            <div
              key={s.step}
              className="bg-cream/50 border border-ink/10 rounded-xl p-4"
            >
              <div className="w-8 h-8 rounded-full bg-maroon text-cream font-bold flex items-center justify-center mb-3 text-sm">
                {s.step}
              </div>
              <h4 className="text-sm font-bold text-ink mb-1.5">{s.title}</h4>
              <p className="text-[13px] text-taupe leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-sand/10 border border-sand/30 rounded-xl p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-sand-dark shrink-0 mt-0.5" />
          <div className="text-[13px] text-sand-dark space-y-1">
            <p className="font-bold">Tips for a fast approval</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Make sure the paper header (course name, department, exam) is visible in the first photo.</li>
              <li>Upload pages in order, starting from page 1.</li>
              <li>Use good lighting and avoid shadows — the AI needs to read the text.</li>
            </ul>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        title="What Happens After Upload"
        subtitle="Verification verdicts explained"
        icon={<ShieldCheck className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statuses.map((s) => (
            <div
              key={s.status}
              className="bg-cream/50 border border-ink/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                {s.icon}
                <span className="font-bold text-sm text-ink">{s.status}</span>
              </div>
              <p className="text-[13px] text-taupe leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection
        title="Searching & Downloading"
        subtitle="Find and save papers"
        icon={<Search className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-cream/50 border border-ink/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
              <Search className="w-4 h-4 text-maroon" />
              Search &amp; filter
            </h4>
            <p className="text-[13px] text-taupe leading-relaxed">
              Search by course name, code, instructor or department. Use the
              Filters panel to narrow by program, exam type, year or instructor,
              and choose how results are sorted.
            </p>
          </div>
          <div className="bg-cream/50 border border-ink/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
              <Download className="w-4 h-4 text-maroon" />
              Download
            </h4>
            <p className="text-[13px] text-taupe leading-relaxed">
              Open any paper to preview the pages, check the AI report, switch
              between the main version and backups, or download everything as a
              single PDF.
            </p>
          </div>
        </div>
      </GuideSection>
    </div>
  );
};
