

import React, { useState } from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import Spinner from '../components/Spinner';

const SignupPage = (): React.ReactNode => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = ReactRouterDOM.useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError(t('auth.error.passwordMismatch'));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative max-w-md w-full space-y-8 bg-white/10 dark:bg-black/20 backdrop-blur-md p-10 rounded-2xl border border-white/20">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-white uppercase tracking-wider">{t('auth.signupTitle')}</h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            {t('auth.or')} <ReactRouterDOM.NavLink to="/login" className="font-medium text-accent hover:text-accent-dark">{t('auth.loginInstead')}</ReactRouterDOM.NavLink>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email-address" className="sr-only">{t('auth.email')}</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20 rounded-t-md"
                placeholder={t('auth.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">{t('auth.password')}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="sr-only">{t('auth.confirmPassword')}</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20 rounded-b-md"
                placeholder={t('auth.confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center bg-red-900/50 border border-red-700 p-2 rounded-md">{error}</p>}

          <div>
            <Button type="submit" className="group relative w-full flex justify-center" disabled={isLoading}>
              {isLoading ? <Spinner size="6" /> : t('auth.signupButton')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;