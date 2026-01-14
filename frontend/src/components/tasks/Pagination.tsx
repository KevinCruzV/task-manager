import type { PaginationProps } from "../../types/task";

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
     return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-slate-300">
        Page <span className="font-semibold text-slate-100">{page}</span> /{" "}
        <span className="font-semibold text-slate-100">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 disabled:opacity-50"
          onClick={onPrev}
          disabled={page <= 1}
        >
          Prev
        </button>
        <button
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 disabled:opacity-50"
          onClick={onNext}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}