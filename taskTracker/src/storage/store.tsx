import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import scheduleReducer from "./sсheduleSlice";
import deleteReducer from "./deleteSlice";
import delegateReducer from "./delegateSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Combine all box reducers into the root reducer
const rootReducer = combineReducers({
  todo: todoReducer,
  schedule: scheduleReducer,
  delegate: delegateReducer,
  delete: deleteReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
store.subscribe(() => {
  console.log("State updated:", store.getState());
});
export default store;
