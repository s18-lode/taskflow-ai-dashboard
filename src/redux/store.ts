import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui-slice"
import taskReducer from "./slices/task-slice"

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        tasks: taskReducer,
    },
});

export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;