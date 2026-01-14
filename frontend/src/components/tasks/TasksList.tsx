import type { Task } from "../../types/task";
import TaskCard from "./TaskCard";

export default function TasksList({ items, onChanged, } : { items: Task[], onChanged: () => void }) {
    return (
        <ul className="space-y-3">
            {items.map((t) => (
                <TaskCard key={t.id} task={t} onChanged={onChanged}/>
            ))}
        </ul>
    );
}