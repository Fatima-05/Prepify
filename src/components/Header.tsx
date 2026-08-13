import React from 'react';
import {
  FileText,
  Upload,
  ShieldCheck,
  UserCheck,
  Search,
  LogOut,
} from 'lucide-react';
import { UserSession } from '../types';

interface HeaderProps {
  user: UserSession;
  activeTab: 'browse' | 'upload' | 'admin';
  setActiveTab: (tab: 'browse' | 'upload' | 'admin') => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  appealsCount: number;
}

const NAV_ITEMS = [
  { id: 'browse' as const, label: 'Search Papers', icon: Search },
  { id: 'upload' as const, label: 'Upload Paper', icon: Upload },
  { id: 'admin' as const, label: 'Admin', icon: ShieldCheck, adminOnly: true },
];

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenAuthModal,
  onLogout,
  appealsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('browse')}
          >
            <div className="w-9 h-9 rounded-lg bg-maroon flex items-center justify-center text-cream shadow-sm group-hover:bg-maroon-dark transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-ink">
                  Prepify
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sand/20 text-sand-dark border border-sand/30 rounded-full">
                  ATD Campus
                </span>
              </div>
              <p className="text-xs text-taupe font-medium">
                Verified Past Papers Repository
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.filter(
              (item) => !item.adminOnly || user.role === 'admin'
            ).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isUpload = item.id === 'upload';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isUpload && !user.isAuthenticated) {
                      onOpenAuthModal();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-maroon text-cream shadow-sm'
                      : 'text-taupe hover:text-ink hover:bg-ink/5'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      !isActive
                        ? item.id === 'admin'
                          ? 'text-sand-dark'
                          : isUpload
                          ? 'text-sand-dark'
                          : ''
                        : ''
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.id === 'admin' && appealsCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full">
                      {appealsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Auth Controls */}
          <div className="flex items-center gap-3">
            {user.isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-ink flex items-center justify-end gap-1.5">
                    {user.name}
                    {user.role === 'admin' && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-maroon/10 text-maroon border border-maroon/20 rounded">
                        Admin
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-taupe">{user.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign out"
                  className="p-2 rounded-lg text-taupe hover:text-maroon hover:bg-maroon/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-maroon hover:bg-maroon-dark text-cream font-semibold text-sm shadow-sm transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>Contributor Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
