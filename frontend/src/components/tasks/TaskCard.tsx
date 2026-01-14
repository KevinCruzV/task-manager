import type { Task } from "../../types/task";
import { formatDate } from "../../utils";
import { useState } from "react";
import { updateTask, deleteTask } from "../../api/tasks/tasks.service";

export default function TaskCard({ task, onChanged }: { task: Task, onChanged: () => void; }) {
  // if Im waiting for an action of the backend
  const [backBusy, setBackBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");

    async function toggleCompleted() {
      setBackBusy(true);
      try {
        await updateTask(task.id, { completed: !task.completed });
        onChanged();
      } finally {
        setBackBusy(false);
      }
    }

    async function remove() {
      if (!confirm("Delete this task?")) return;
      setBackBusy(true);
      try {
        await deleteTask(task.id);
        onChanged();
      } finally {
        setBackBusy(false);
      }
    }

    function cancel() {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setEditing(false);
    }

    async function save() {
      const nextTitle = title.trim();
      const nextDescription = description.trim() ? description.trim() : null;

      if (
        nextTitle === task.title &&
        nextDescription === (task.description ?? null)
      ) {
        setEditing(false);
        return;
      }

      if (!nextTitle) return;

      setBackBusy(true);
      try {
        await updateTask(task.id, {
          title: nextTitle,
          description: nextDescription,
        });
        setEditing(false);
        onChanged();
      } finally {
        setBackBusy(false);
      }
  }

return (
    <li className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {/* Toggle completed */}
            <button
              type="button"
              onClick={toggleCompleted}
              disabled={backBusy}
              className={[
                "inline-flex h-4 w-4 items-center justify-center rounded border text-[10px]",
                "disabled:opacity-50",
                task.completed
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-slate-300 text-slate-400 hover:bg-slate-50",
              ].join(" ")}
              title={task.completed ? "Mark as pending" : "Mark as completed"}
            >
              {task.completed ? "✓" : ""}
            </button>


            {/* Title */}
            {editing ? (
              <input
                className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              disabled={backBusy}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") cancel();
                }}
              />
            ) : (
              <h3
                className={[
                  "truncate font-semibold",
                  task.completed
                    ? "text-slate-600 line-through"
                    : "text-slate-900",
                ].join(" ")}
                title={task.title}
              >
                {task.title}
              </h3>
            )}
          </div>

          {/* Description */}
          <div className="mt-2">
            {editing ? (
              <textarea
                className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={backBusy}
                rows={3}
              />
            ) : task.description ? (
              <p className="line-clamp-2 text-sm text-slate-700">
                {task.description}
              </p>
            ) : (
              <p className="text-sm text-slate-400 italic">No description</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-2">
            {/* Edit and Delete */}
            {!editing ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  disabled={backBusy}
                  className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:opacity-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={remove}
                  disabled={backBusy}
                  className="inline-flex items-center rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 disabled:opacity-50"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={save}
                  disabled={backBusy || !title.trim()}
                  className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:opacity-50"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={cancel}
                  disabled={backBusy}
                  className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            )}

            {backBusy && <span className="text-xs text-slate-400">Saving…</span>}
          </div>
        </div>

        <div className="shrink-0 text-right text-xs text-slate-500">
          <div>Created</div>
          <div className="mt-1">{formatDate(task.createdAt)}</div>
        </div>
      </div>
    </li>
  );
}