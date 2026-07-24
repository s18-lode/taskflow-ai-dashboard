import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTasks, fetchTasks, updateTaskStatus, deleteTaskById, editTaskTitle } from "@/services/task-service";
import { Task } from "@/types/task";
import { use } from "react";


// /API state in Redux
interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

//fetch all created data 
export const getTasks =
    createAsyncThunk(
        "tasks/getTasks",

        async (userId: string) => {
            const response =
                await fetchTasks(userId);

            return response;
        }
    )

//add new task and newaly added fetch getTasks
export const addTaskAsync =
    createAsyncThunk(
        "tasks/addTask",

        async (
            {
                title,
                userId,
                parentId = null,
            }: {
                title: string,
                userId: string,
                parentId?: number | null;
            },
            { dispatch }
        ) => {
            await createTasks(title, userId, parentId);
            dispatch(getTasks(userId));
        }
    )

export const toggleTaskAsync =
    createAsyncThunk(
        "tasks/toggleTask",
        async (
            {
                id,
                completed,
                userId,
            }: {
                id: number,
                completed: boolean;
                userId: string
            },
            { dispatch }
        ) => {
            await updateTaskStatus(
                id,
                completed,
            );

            dispatch(getTasks(userId));
        }
    )


export const deleteTaskAsync =
    createAsyncThunk(
        "tasks/deleteTask",

        async (
            {
                id,
                userId
            }: {
                id: number,
                userId: string
            },
            { dispatch }
        ) => {
            await deleteTaskById(id);

            dispatch(getTasks(userId))
        }
    );

export const editTaskAsync =
    createAsyncThunk(
        "tasks/editTask",

        async (
            {
                id,
                title,
                userId,
            }: {
                id: number,
                title: string,
                userId: string
            },
            { dispatch }
        ) => {
            await editTaskTitle(id, title);

            dispatch(getTasks(userId))

        }
    );

const taskSlice = createSlice({
    name: "tasks",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(
                getTasks.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getTasks.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.tasks = action.payload;
                }
            )

            .addCase(
                getTasks.rejected,
                (state) => {
                    state.loading = false;
                    state.error = "Failed to fetch tasks";
                }
            );
    },
});

export default taskSlice.reducer