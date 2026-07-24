import { Task } from "@/types/task";
import TaskRow from "./TaskRow";

interface TaskListProps {
    tasks: Task[];
    userId: string;
    onToggle: (id: number, completed: boolean) => void;
    onEdit: (id: number, title: string) => void;
    onDelete: (id: number) => void;
    onAddSubTask: (title: string, parentId: number) => void;
}

export default function TaskList({
    tasks,
    userId,
    onToggle,
    onEdit,
    onDelete,
    onAddSubTask,
}: TaskListProps) {
    const parentTasks = tasks.filter(
        (task) => task.parent_id === null
    );

    return (
        <div className="space-y-4">
            {parentTasks.map((parentTask) => (
                <TaskRow
                    key={parentTask.id}
                    task={parentTask}
                    subTasks={tasks.filter(
                        (task) => task.parent_id === parentTask.id
                    )}
                    userId={userId}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAddSubTask={onAddSubTask}
                />
            ))}
        </div>
    );
}