import { useState, useMemo } from "react";
import type { AuthFormProps } from "../../types/auth";

export function AuthForm({mode, onSubmit}: AuthFormProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const isRegister = mode === 'register';
    const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const isValid = useMemo(() => {
      const e = email.trim();
      if (!isEmail(e)) return false;
      if (password.length < 6) return false;
      if (isRegister && password !== confirm) return false;
      return true;
    }, [email, password, confirm, isRegister]);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setError(null);

      if (!isValid || loading) return;

      try {
        setLoading(true);
        await onSubmit({ email: email.trim(), password });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

  return (
    <>
      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            type="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-slate-500">Min. 6 characters</p>
        </div>

        {isRegister ? (
          <div>
            <label className="block text-sm font-medium text-slate-700">Confirm password</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
            {confirm.length > 0 && password !== confirm ? (
              <p className="mt-1 text-xs text-red-700">The passwords do not match.</p>
            ) : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!isValid || loading}
          className="inline-flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? isRegister
              ? "Creating account…"
              : "Signing in…"
            : isRegister
              ? "Create account"
              : "Sign in"}
        </button>
      </form>
    </>
  );
}