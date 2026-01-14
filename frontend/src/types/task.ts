export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type TasksSortBy = "createdAt" | "completed";
export type TasksOrder = "asc" | "desc";

export type TasksQuery = {
  page?: number;
  limit?: number;
  completed?: boolean;
  q?: string;
  sortBy?: TasksSortBy;
  order?: TasksOrder;
};

export type TasksListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type TasksListResponse = {
  items: Task[];
  meta: TasksListMeta;
};

export type CompletedFilter = "all" | "completed" | "pending";

export type TasksFiltersProps = {
  q: string;
  completed: CompletedFilter;
  sortBy: TasksSortBy;
  order: TasksOrder;
  limit: number;

  onQChange: (value: string) => void;
  onCompletedChange: (value: CompletedFilter) => void;
  onSortByChange: (value: TasksSortBy) => void;
  onOrderChange: (value: TasksOrder) => void;
  onLimitChange: (value: number) => void;
  onReset: () => void;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export type CreateTaskBody = {
  title: string;
  description?: string | null;
};

export type UpdateTaskBody = Partial<{
  title: string;
  description: string | null;
  completed: boolean;
}>;

export type CreateTaskProps = {
  onCreated: () => void;
};
