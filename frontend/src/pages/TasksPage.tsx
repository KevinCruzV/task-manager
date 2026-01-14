import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";

import { clearToken } from "../api/auth/auth.store";
import { getTasks } from "../api/tasks/tasks.service";

import type { CompletedFilter, Task, TasksOrder, TasksSortBy } from "../types/task";
import TasksFilters from "../components/tasks/TasksFilters";
import TasksList from "../components/tasks/TasksList";
import Pagination from "../components/tasks/Pagination";
import TaskCreateForm from "../components/tasks/TaskCreateForm";

export function TasksPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");
  const [completed, setCompleted] = useState<CompletedFilter>("all");
  const [sortBy, setSortBy] = useState<TasksSortBy>("createdAt");
  const [order, setOrder] = useState<TasksOrder>("desc");
  const [items, setItems] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  function logout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  const completedParam = useMemo(() => {
    if (completed === "all") return undefined;
    return completed === "completed" ? true : false;
  }, [completed]);

  const refetchTasks = () => setRefetchKey((k) => k + 1);

  // to avoid setter in a useeffect
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getTasks({
        page,
        limit,
        q,
        completed: completedParam,
        sortBy,
        order,
      });

      setItems(res.items);
      setTotal(res.meta.total);
      setTotalPages(res.meta.totalPages);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [page, limit, q, completedParam, sortBy, order]);

  useEffect(() => {
    refresh();
  }, [refresh, refetchKey]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>
            <p className="mt-1 text-sm text-slate-600">
              {total} task{total > 1 ? "s" : ""} • page {page}/{totalPages}
            </p>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <TasksFilters
            q={q}
            completed={completed}
            sortBy={sortBy}
            order={order}
            limit={limit}
            onQChange={(value) => {
              setPage(1);
              setQ(value);
            }}
            onCompletedChange={(value) => {
              setPage(1);
              setCompleted(value);
            }}
            onSortByChange={(value) => {
              setPage(1);
              setSortBy(value);
            }}
            onOrderChange={(value) => {
              setPage(1);
              setOrder(value);
            }}
            onLimitChange={(value) => {
              setPage(1);
              setLimit(value);
            }}
            onReset={() => {
              setPage(1);
              setQ("");
              setCompleted("all");
              setSortBy("createdAt");
              setOrder("desc");
            }}
          />

          <TaskCreateForm
            onCreated={() => {
              setPage(1);
              refetchTasks();
            }}
          />

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-3 py-6 text-sm text-slate-600">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                Loading...
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <p className="text-sm text-slate-600">No tasks found.</p>
            )}

            {!loading && !error && items.length > 0 && <TasksList items={items} onChanged={refetchTasks} />}
          </div>

          {!loading && !error && items.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          )}
        </div>
      </div>
    </div>
  );
}