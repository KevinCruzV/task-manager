import type { Task } from "../../types/task";
import { formatDate } from "../../utils";

export function TaskCard({ task }: {task : Task}) {
     return (
    <li className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={[
                "inline-flex h-5 w-5 items-center justify-center rounded-md border text-xs",
                task.completed
                  ? "border-emerald-900/60 bg-emerald-950/30 text-emerald-200"
                  : "border-slate-700 bg-slate-950/30 text-slate-300",
              ].join(" ")}
              title={task.completed ? "Completed" : "Pending"}
            >
              {task.completed ? "✓" : "•"}
            </span>

            <h3
              className={[
                "truncate font-semibold",
                task.completed ? "text-slate-300 line-through" : "text-slate-100",
              ].join(" ")}
              title={task.title}
            >
              {task.title}
            </h3>
          </div>

          {task.description ? (
            <p className="mt-2 line-clamp-2 text-sm text-slate-300/90">
              {task.description}
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-500 italic">No description</p>
          )}
        </div>

        <div className="shrink-0 text-right text-xs text-slate-400">
          <div>Created</div>
          <div className="mt-1">{formatDate(task.createdAt)}</div>
        </div>
      </div>
    </li>
  );
}