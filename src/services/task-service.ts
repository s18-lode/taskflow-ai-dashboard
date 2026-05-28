import { resolve } from "path";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const mockTasks: Task[] = [
    // Temporary fake backend data.
    {
        id: 1,
        title: "Build dashboard UI",
        completed: true,
    },
    {
        id: 2,
        title: "Setup Redux Toolkit",
        completed: true,
    },
    {
        id: 3,
        title: "Implement task API",
        completed: false,
    },
]

export const fetchTasks = async () => {
    return new Promise<Task[]>((resolve) => {
        setTimeout(() => {
            resolve(mockTasks);
        }, 1500);
    });
};