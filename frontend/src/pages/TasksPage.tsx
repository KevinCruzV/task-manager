import { useNavigate } from 'react-router-dom';
import { clearToken } from '../api/auth/auth.store';

export function TasksPage() {
  const navigate = useNavigate();

  function logout() {
    clearToken();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Tasks</h1>
          <button
            onClick={logout}
            className="
              rounded-lg
              border border-slate-600
              bg-slate-800
              px-3 py-2
              text-sm font-medium
              text-slate-100
              hover:bg-slate-700
              hover:text-slate-100
              focus:outline-none
              focus:ring-0
            "
          >
            Logout
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-700">
            ✅ Auth OK. see the next step
          </p>
        </div>
      </div>
    </div>
  );
}
