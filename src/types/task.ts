export interface Task {
    id: number;
    title: string;
    completed: boolean;
    parent_id: number | null;
}