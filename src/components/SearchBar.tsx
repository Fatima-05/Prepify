import React, { useState } from 'react';
import { Search, X, RotateCcw, Layers, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Department, FilterState } from '../types';
import { EXAM_TYPES, YEARS } from '../constants';

interface SearchBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  departments: Department[];
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  setFilters,
  departments,
  totalResults,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const currentDept = departments.find((d) => d.id === filters.departmentId);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      departmentId: '',
      examType: '',
      year: '',
      instructor: '',
      showBackups: false,
      sortBy: 'latest',
    });
  };

  const activeFilterCount = [
    filters.departmentId,
    filters.examType,
    filters.year,
    filters.instructor,
    filters.showBackups,
  ].filter(Boolean).length;

  const hasActiveFilters =
    activeFilterCount > 0 || filters.searchQuery.length > 0;

  const selectClass =
    'w-full bg-cream/40 border border-ink/15 rounded-lg px-3 py-2 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-sand focus:border-transparent transition-shadow';

  return (
    <div className="bg-white border border-ink/10 rounded-2xl p-4 sm:p-5 shadow-sm mb-10">
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-taupe">
            <Search className="w-5 h-5 text-sand" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            placeholder="Search by course code, course name, instructor, or department..."
            className="w-full pl-11 pr-10 py-2.5 bg-cream/40 border border-ink/15 rounded-xl text-ink placeholder-taupe focus:outline-none focus:ring-2 focus:ring-sand focus:border-transparent text-sm font-medium transition-shadow"
          />
          {filters.searchQuery && (
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, searchQuery: '' }))
              }
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-taupe hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors shrink-0 ${
            showFilters || activeFilterCount > 0
              ? 'bg-maroon border-maroon text-cream'
              : 'border-ink/15 text-taupe hover:text-ink hover:border-ink/30'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-cream text-maroon rounded-full">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${
              showFilters ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
          <div>
            <label className="block text-xs font-semibold text-taupe mb-1.5">
              Department
            </label>
            <select
              value={filters.departmentId}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  departmentId: e.target.value,
                  instructor: '',
                }))
              }
              className={selectClass}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-taupe mb-1.5">
              Exam Type
            </label>
            <select
              value={filters.examType}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, examType: e.target.value }))
              }
              className={selectClass}
            >
              <option value="">All Exam Types</option>
              {EXAM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-taupe mb-1.5">
              Year
            </label>
            <select
              value={filters.year}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, year: e.target.value }))
              }
              className={selectClass}
            >
              <option value="">All Years</option>
              {YEARS.map((yr) => (
                <option key={yr} value={yr.toString()}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-taupe mb-1.5">
              Instructor {currentDept ? `(${currentDept.id})` : ''}
            </label>
            <select
              value={filters.instructor}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, instructor: e.target.value }))
              }
              className={selectClass}
            >
              <option value="">All Instructors</option>
              {currentDept
                ? currentDept.instructors.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))
                : departments
                    .flatMap((d) => d.instructors)
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map((inst) => (
                      <option key={inst} value={inst}>
                        {inst}
                      </option>
                    ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-taupe mb-1.5">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className={selectClass}
            >
              <option value="latest">Latest Year</option>
              <option value="readability">Readability Score</option>
              <option value="downloads">Most Downloaded</option>
              <option value="confidence">AI Confidence</option>
            </select>
          </div>
        </div>
      )}

      <div className="mt-4 pt-3.5 border-t border-ink/10 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-2 text-taupe font-medium cursor-pointer hover:text-ink select-none">
            <input
              type="checkbox"
              checked={filters.showBackups}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, showBackups: e.target.checked }))
              }
              className="w-4 h-4 rounded accent-maroon"
            />
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sand" />
              Include Backup / Incomplete Scans
            </span>
          </label>

          <span className="text-taupe">
            <strong className="text-maroon font-bold">{totalResults}</strong>{' '}
            {totalResults === 1 ? 'paper' : 'papers'}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink/15 text-taupe hover:text-ink hover:border-ink/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
