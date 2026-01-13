import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold text-slate-900">Tailwind OK ✅</h1>
        <p className="mt-2 text-slate-600">
          Frontend Vite + TS + Tailwind prêt.
        </p>
        <button className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90">
          Button test
        </button>
      </div>
    </div>
  );
}
