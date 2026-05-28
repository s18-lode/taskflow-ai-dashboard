import { createSlice } from "@reduxjs/toolkit";

{/*What is createSlice()?

Redux Toolkit helper that automatically creates:
✅ reducer
✅ actions
✅ action types

*/}


interface UIState {
  isSidebarOpen: boolean;
}

const initialState: UIState = {
  isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen =
        !state.isSidebarOpen;
    },
  },
});

export const {
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;

//first UI toggle feature 