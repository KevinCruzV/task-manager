import { useState } from "react";
import { createTask } from "../../api/tasks/tasks.service";
import type { CreateTaskProps } from "../../types/task";

export default function TaskCreateForm({ onCreated }: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backBusy, setBackBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) return;

    setBackBusy(true);
    setError(null);

    try {
      await createTask({
        title: trimmedTitle,
        description: trimmedDescription ? trimmedDescription : null,
      });

      setTitle("");
      setDescription("");
      onCreated();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create task");
    } finally {
      setBackBusy(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-sm font-semibold text-slate-900">Create a task</h2>

      <form onSubmit={onSubmit} className="mt-3 space-y-3">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-700">
            Title
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 disabled:bg-slate-50"
            placeholder="e.g. Pay rent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={backBusy}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-700">
            Description (optional)
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 disabled:bg-slate-50"
            placeholder="Add details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={backBusy}
            rows={3}
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={backBusy || !title.trim()}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:opacity-60"
          >
            {backBusy ? "Creating…" : "Create"}
          </button>

          {backBusy && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
              Sending…
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
