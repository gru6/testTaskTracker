import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskState } from "./todoSlice";

const initialState: TaskState = {
  tasks: [],
};

export const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    completeTask: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
      }
    },
    editTask: (
      state,
      action: PayloadAction<{ id: number; text: string; tag: string[], fullText: string }>
    ) => {
      const { id, text, tag, fullText } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index].text = text;
        state.tasks[index].fullText = fullText;
        state.tasks[index].tag = tag;
      }
    },
    droppedTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTask, removeTask, completeTask } = deleteSlice.actions;
export default deleteSlice.reducer;
