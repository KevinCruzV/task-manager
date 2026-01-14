import type { Task } from "../../types/task";
import { TaskCard } from "./TaskCard";

export function TasksList({ items } : { items: Task[] }) {
    return (
        <ul className="space-y-3">
            {items.map((t) => (
                <TaskCard key={t.id} task={t}/>
            ))}
        </ul>
    );
}