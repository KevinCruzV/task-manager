import { apiFetch } from "../client";
import type { TasksQuery, TasksListResponse } from "../../types/task";

export async function getTasks(params: TasksQuery): Promise<TasksListResponse> {
    const searchParams = new URLSearchParams();

    searchParams.set("page", String(params.page));
    searchParams.set("limit", String(params.limit));

    if (typeof params.completed === 'boolean') searchParams.set("completed", String(params.completed));

    if (params.q && params.q.trim()) searchParams.set("q", params.q.trim());

    if (params.sortBy) searchParams.set("sortBy", params.sortBy);

    if (params.order) searchParams.set("order", params.order);

    return apiFetch<TasksListResponse>(`/tasks.${searchParams.toString()}`);
}