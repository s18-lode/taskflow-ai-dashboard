import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from "react-redux";

import type {
    RootState,
    AppDispatch,
} from "./store";

export const useAppDispatch =
    useDispatch.withTypes<AppDispatch>();

export const useAppSelector:
    TypedUseSelectorHook<RootState> =
    useSelector;


{/* what is useAppDispatch:
  This is typed version of useDispatch()
  Beacause of this TS understand the 
  - valid actions 
  - thunk types
  - dispatch structure  
*/}


{/* what is useAppSelector:
  This is typed version of useSelector()
  Now TypeScript automatically knows: 
  ex : state.ui.isSidebarOpen 
*/}