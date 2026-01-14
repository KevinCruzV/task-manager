import type { TasksFiltersProps, TasksOrder, CompletedFilter, TasksSortBy } from "../../types/task"; 

export default function TasksFilter({
  q,
  completed,
  sortBy,
  order,
  limit,
  onQChange,
  onCompletedChange,
  onSortByChange,
  onOrderChange,
  onLimitChange,
  onReset,
}: TasksFiltersProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                {/* Search */}
                <div className="md:col-span-5">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Search
                    </label>
                    <input
                        value={q}
                        onChange={(e) => onQChange(e.target.value)}
                        placeholder="Search title or description..."
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
                    />
                </div>

                {/* Status */}
                <div className="md:col-span-3">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Status
                    </label>
                    <select
                        value={completed}
                        onChange={(e) => onCompletedChange(e.target.value as CompletedFilter)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-600"
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                {/* Sort by */}
                <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Sort by
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortByChange(e.target.value as TasksSortBy)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-600"
                    >
                        <option value="createdAt">Created</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Order */}
                <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Order
                    </label>
                    <select
                        value={order}
                        onChange={(e) => onOrderChange(e.target.value as TasksOrder)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-600"
                    >
                        <option value="desc">Desc</option>
                        <option value="asc">Asc</option>
                    </select>
                </div>

                {/* Per page */}
                <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Per page
                    </label>
                    <select
                        value={String(limit)}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-600"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex justify-end">
                <button
                type="button"
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                onClick={onReset}
                >
                    Reset filters
                </button>
            </div>
        </div>
    );
}