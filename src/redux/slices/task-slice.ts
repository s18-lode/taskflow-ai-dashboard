import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTasks, Task } from "@/services/task-service";


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