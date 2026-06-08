import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTasks, Task } from "@/services/task-service";
import { stat } from "fs";
import { act } from "react";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";


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


export const getTasks =
    createAsyncThunk(
        "tasks/getTasks",

        async () => {
            const response =
                await fetchTasks();

            return response;
        }
    )

const taskSlice = createSlice({
    name: "tasks",

    initialState,

    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },

        toggleTask: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload
            );

            if (task) {
                task.completed = !task.completed;
            }
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },

        editTask: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload.id
            );

            if (task) {
                task.title = action.payload.title;
            }
        },
    },

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

export const { addTask, toggleTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer