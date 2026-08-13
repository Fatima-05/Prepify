import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  Type,
  X,
} from 'lucide-react';

interface RulesBannerProps {
  onClose?: () => void;
}

const RULES = [
  {
    number: 'Rule 1',
    title: 'Instructor Scoping',
    description:
      'Instructors are strictly bound to selected Departments. Users pick from existing faculty lists to prevent duplicate or misspelled professor names.',
    icon: CheckCircle2,
    accent: 'text-emerald-700',
    chip: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-50',
  },
  {
    number: 'Rule 2',
    title: 'Fuzzy Verification & Appeals',
    description:
      'AI OCR evaluates text against selected Course & Department headers.',
    icon: Sparkles,
    accent: 'text-amber-600',
    chip: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-50',
    extra: (
      <span className="text-xs leading-relaxed">
        <span className="font-semibold text-emerald-700">&gt;80%:</span>{' '}
        Auto-Approve •{' '}
        <span className="font-semibold text-amber-600">50-79%:</span> Pending
        Verification •{' '}
        <span className="font-semibold text-maroon">&lt;50%:</span> Hard Reject
        (with Appeal option to Admin).
      </span>
    ),
  },
  {
    number: 'Rule 3',
    title: 'Completeness Over Clarity',
    description:
      'When duplicate submissions occur for the same course/year, the paper with more pages is promoted to Main Version. Lesser versions are archived as Backup Scans.',
    icon: Layers,
    accent: 'text-sand-dark',
    chip: 'bg-sand/10 border-sand/30',
    iconBg: 'bg-sand/10',
  },
  {
    number: 'Rule 4',
    title: 'Instructor Normalization',
    description:
      'All instructor inputs are automatically standardized (e.g. "DR. ALI" and "dr ali" both save as "Dr. Ali").',
    icon: Type,
    accent: 'text-maroon',
    chip: 'bg-maroon/10 border-maroon/20',
    iconBg: 'bg-maroon/10',
  },
];

export const RulesBanner: React.FC<RulesBannerProps> = ({ onClose }) => {
  return (
    <div className="relative bg-white border border-ink/10 rounded-2xl p-6 sm:p-8 shadow-sm">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-taupe hover:text-ink rounded-lg hover:bg-ink/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center gap-3 mb-7">
        <div className="p-2.5 rounded-xl bg-maroon text-cream shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-ink tracking-tight">
            Master Blueprint Rules &amp; AI Gatekeeper Protocol
          </h2>
          <p className="text-sm text-taupe">
            COMSATS University Abbottabad Campus • Quality Control Framework
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RULES.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.number}
              className="bg-cream/60 border border-ink/10 rounded-xl p-5 flex gap-4 items-start hover:border-sand/40 transition-colors"
            >
              <div
                className={`p-2.5 rounded-lg ${rule.iconBg} ${rule.accent} shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${rule.chip} ${rule.accent}`}
                  >
                    {rule.number}
                  </span>
                  <h3 className="font-bold text-ink text-sm">{rule.title}</h3>
                </div>
                <p className="text-[13px] text-taupe leading-relaxed">
                  {rule.description}
                </p>
                {rule.extra}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
