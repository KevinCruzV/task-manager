import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthForm } from '../../components/auth/AuthForm';
import { register } from '../../api/auth/auth.service';
import { setToken } from '../../api/auth/auth.store';

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <h2 className="text-lg font-semibold text-slate-900">Create account</h2>
      <p className="mt-1 text-sm text-slate-600">
        Create an account to start managing your tasks.
      </p>

      <AuthForm
        mode="register"
        onSubmit={async ({ email, password }) => {
          const res = await register(email, password);
          setToken(res.access_token);
          navigate('/tasks', { replace: true });
        }}
      />

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{' '}
        <Link className="font-medium text-slate-900 underline" to="/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
