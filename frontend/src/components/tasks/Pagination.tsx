import type { PaginationProps } from "../../types/task";

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
     return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-slate-700">
        Page <span className="font-semibold text-slate-700">{page}</span> /{" "}
        <span className="font-semibold text-slate-700">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}