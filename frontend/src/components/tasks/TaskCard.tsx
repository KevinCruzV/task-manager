import type { Task } from "../../types/task";
import { formatDate } from "../../utils";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={[
                "inline-flex h-5 w-5 items-center justify-center rounded-md border text-xs font-medium",
                task.completed
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-300 bg-slate-100 text-slate-600",
              ].join(" ")}
              title={task.completed ? "Completed" : "Pending"}
            >
              {task.completed ? "✓" : "•"}
            </span>

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
          </div>

          {task.description ? (
            <p className="mt-2 line-clamp-2 text-sm text-slate-700">
              {task.description}
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-400 italic">
              No description
            </p>
          )}
        </div>

        <div className="shrink-0 text-right text-xs text-slate-500">
          <div>Created</div>
          <div className="mt-1">{formatDate(task.createdAt)}</div>
        </div>
      </div>
    </li>
  );
}