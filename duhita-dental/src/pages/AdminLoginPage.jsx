import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@duhitadental.in');
  const [password, setPassword] = useState('Admin@123456');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    } else {
      toast.error(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy dark:bg-brand-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-brand-accent/15 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl text-white relative z-10"
      >
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/80 shadow-lg text-white">
            <FiLock size={26} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Portal</h2>
          <p className="mt-1 text-sm text-white/70">Duhita Multispeciality Dental Centre</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
              Username / Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@duhitadental.in"
                className="w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              />
            </div>
          </div>

          <div className="rounded-xl bg-white/5 p-3 text-xs text-white/70 border border-white/10 flex items-start gap-2">
            <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={14} />
            <span>Default Seed Credentials: <strong>admin@duhitadental.in</strong> / <strong>Admin@123456</strong></span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-primary/30 hover:bg-brand-primary/90 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <FiArrowRight />
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-white/60 hover:text-white transition-colors">
            ← Back to Public Website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
