import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthForm } from '../components/auth/AuthForm';
import { login } from '../auth/auth.service';
import { setToken } from '../auth/auth.store';

type LocationState = { from?: string };

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as LocationState | null)?.from ?? '/tasks';

  return (
    <AuthLayout>
      <h2 className="text-lg font-semibold text-slate-900">Sign in</h2>
      <p className="mt-1 text-sm text-slate-600">
        Sign in to access your tasks.
      </p>

      <AuthForm
        mode="login"
        onSubmit={async ({ email, password }) => {
          const res = await login(email, password);
          setToken(res.accessToken);
          navigate(from, { replace: true });
        }}
      />

      <p className="mt-4 text-sm text-slate-600">
        Don&apos;t have an account?{' '}
        <Link className="font-medium text-slate-900 underline" to="/register">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
