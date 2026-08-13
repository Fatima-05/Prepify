import React, { useState } from 'react';
import { X, UserCheck } from 'lucide-react';
import { UserSession } from '../types';

const ADMIN_EMAIL = 'admin@paperhub.app';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
}

const inputClass =
  'w-full bg-cream/40 border border-ink/15 rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder-taupe focus:outline-none focus:ring-2 focus:ring-sand focus:border-transparent transition-shadow';

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'contributor' | 'admin'>('contributor');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (role === 'admin' && email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError('That email is not the administrator account.');
      return;
    }

    onLoginSuccess({
      email: email.trim(),
      name: name.trim() || (role === 'admin' ? 'Admin' : 'Contributor'),
      role,
      isAuthenticated: true,
      departmentId: 'CS',
    });
  };

  const loginAsDemoContributor = () => {
    onLoginSuccess({
      email: 'hamza@example.com',
      name: 'Hamza Ahmed',
      role: 'contributor',
      isAuthenticated: true,
      departmentId: 'CS',
    });
  };

  const loginAsDemoAdmin = () => {
    onLoginSuccess({
      email: 'admin@paperhub.app',
      name: 'Dr. Faisal (Exam Dept Head)',
      role: 'admin',
      isAuthenticated: true,
      departmentId: 'CS',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-taupe hover:text-ink hover:bg-ink/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-maroon text-cream shadow-sm">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-ink">COMSATS Auth Portal</h3>
            <p className="text-xs text-taupe">Abbottabad Campus Verification</p>
          </div>
        </div>

        {/* Quick Demo Login Triggers */}
        <div className="mb-6 bg-cream/50 p-3.5 rounded-xl border border-ink/10 space-y-2">
          <span className="text-[10px] font-bold uppercase text-taupe block">
            Instant Test Login Shortcuts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={loginAsDemoContributor}
              className="py-2 px-3 bg-white hover:bg-sand/10 border border-ink/15 text-ink rounded-lg text-xs font-semibold transition-colors text-left"
            >
              Student Contributor
              <span className="block text-[10px] font-normal text-taupe">
                hamza@example.com
              </span>
            </button>

            <button
              onClick={loginAsDemoAdmin}
              className="py-2 px-3 bg-maroon/5 hover:bg-maroon/10 border border-maroon/20 text-maroon rounded-lg text-xs font-semibold transition-colors text-left"
            >
              Admin User
              <span className="block text-[10px] font-normal text-maroon/70">
                {ADMIN_EMAIL}
              </span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {error && (
            <div className="p-3 rounded-lg bg-maroon/5 border border-maroon/25 text-maroon text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-taupe font-semibold mb-1.5 text-xs">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hamza Ahmed"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-taupe font-semibold mb-1.5 text-xs">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              className={inputClass}
            />
            <p className="mt-1.5 text-[11px] text-taupe">
              Contributor accounts can use any email. Administrator access is
              restricted to {ADMIN_EMAIL}.
            </p>
          </div>

          <div>
            <label className="block text-taupe font-semibold mb-1.5 text-xs">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className={inputClass}
            >
              <option value="contributor">Contributor (Student / Faculty)</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-maroon hover:bg-maroon-dark text-cream font-semibold text-sm rounded-lg shadow-sm transition-colors"
          >
            Authenticate &amp; Continue
          </button>
        </form>
      </div>
    </div>
  );
};
