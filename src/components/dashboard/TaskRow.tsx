"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import AIGenerateModal from "./AIGenerateModal";


interface TaskRowProps {
    task: Task;
    subTasks: Task[];
    userId: string;
    onToggle: (id: number, completed: boolean) => void;
    onEdit: (id: number, title: string) => void;
    onDelete: (id: number) => void;
    onAddSubTask: (title: string, parentId: number) => void;
}

export default function TaskRow({
    task,
    subTasks,
    onToggle,
    onEdit,
    onDelete,
    onAddSubTask,
}: TaskRowProps) {
    const [expanded, setExpanded] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [subTaskTitle, setSubTaskTitle] = useState("");
    const [showAIModal, setShowAIModal] = useState(false);

    const completedSubTasks = subTasks.filter(
        (task) => task.completed
    ).length;

    return (
        <div className="rounded-xl border border-gray-800 overflow-hidden">

            {/* Parent Row */}
            <div className="flex items-center justify-between p-4">

                {/* Left */}
                <div className="flex items-center gap-3">

                    {subTasks.length > 0 ? (
                        <button onClick={() => setExpanded(!expanded)}>
                            {expanded ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>
                    ) : (
                        <div className="w-[18px]" />
                    )}

                    <div>
                        <p className="font-medium text-white">
                            {task.title}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-gray-400">
                            {/* <span>ID: {task.id}</span> */}

                            {subTasks.length > 0 && (
                                <span>
                                    • {completedSubTasks} / {subTasks.length} Completed
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">

                    <span
                        className={`rounded-lg px-3 py-2 text-sm ${task.completed
                            ? "bg-green-600"
                            : "bg-yellow-600"
                            }`}
                    >
                        {task.completed ? "Completed" : "Pending"}
                    </span>

                    <Button
                        onClick={() =>
                            onToggle(task.id, !task.completed)
                        }
                    >
                        Toggle
                    </Button>

                    <Button
                        onClick={() => {
                            const title = prompt(
                                "Edit Task",
                                task.title
                            );

                            if (title?.trim()) {
                                onEdit(task.id, title);
                            }
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </Button>

                    <Button
                        variant="subSecondary"
                        onClick={() =>
                            setShowInput(!showInput)
                        }
                    >
                        + Subtask
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setShowAIModal(true)}
                    >
                        🤖 Generate
                    </Button>
                </div>

            </div>

            {/* Input */}
            {showInput && (
                <div className="border-t border-gray-800 p-4 flex gap-2">

                    <input
                        value={subTaskTitle}
                        onChange={(e) =>
                            setSubTaskTitle(e.target.value)
                        }
                        placeholder="Enter Subtask"
                        className="flex-1 rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white"
                    />

                    <Button
                        onClick={() => {
                            if (!subTaskTitle.trim()) return;

                            onAddSubTask(
                                subTaskTitle,
                                task.id
                            );

                            setSubTaskTitle("");
                            setShowInput(false);
                        }}
                    >
                        Save
                    </Button>

                </div>
            )}

            {/* Child Rows */}

            {expanded &&
                subTasks.map((subTask) => (
                    <div
                        key={subTask.id}
                        className="flex items-center justify-between border-t border-gray-800 px-12 py-4"
                    >
                        <div>
                            <p className="text-white">
                                • {subTask.title}
                            </p>

                            {/* <p className="text-xs text-gray-400">
                                ID : {subTask.id}
                            </p> */}
                        </div>

                        <div className="flex items-center gap-3">

                            <span
                                className={`rounded-full px-3 py-1 text-sm ${subTask.completed
                                    ? "bg-green-600"
                                    : "bg-yellow-600"
                                    }`}
                            >
                                {subTask.completed
                                    ? "Completed"
                                    : "Pending"}
                            </span>

                            <Button
                                onClick={() =>
                                    onToggle(
                                        subTask.id,
                                        !subTask.completed
                                    )
                                }
                            >
                                Toggle
                            </Button>

                            <Button
                                onClick={() => {
                                    const title = prompt(
                                        "Edit Task",
                                        subTask.title
                                    );

                                    if (title?.trim()) {
                                        onEdit(
                                            subTask.id,
                                            title
                                        );
                                    }
                                }}
                            >
                                Edit
                            </Button>

                            <Button
                                onClick={() =>
                                    onDelete(subTask.id)
                                }
                            >
                                Delete
                            </Button>

                        </div>
                    </div>
                ))}
            <AIGenerateModal
                open={showAIModal}
                taskTitle={task.title}
                onClose={() => setShowAIModal(false)}
            />
        </div>
    );
}