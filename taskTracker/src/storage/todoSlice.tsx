import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  modal: boolean;
  tag: string[];
}

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const todoSlice = createSlice({
  name: "todo",
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
    editTask: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const { id, text } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index].text = text;
      }
    },
  },
});

export const { addTask, removeTask, completeTask, editTask } =
  todoSlice.actions;
export default todoSlice.reducer;
