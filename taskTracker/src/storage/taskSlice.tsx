import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Task {
  id: number;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    completeTask: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = true;
      }
    },
  },
});

export const { addTask, removeTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;
