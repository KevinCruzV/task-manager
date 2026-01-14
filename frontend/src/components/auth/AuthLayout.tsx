import type { AuthLayoutProps } from "../../types/auth";

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
    <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
            <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-slate-900">Task Manager</h1>
            </div>
            {children}
            </div>
        </div>
    </div>
  );
}