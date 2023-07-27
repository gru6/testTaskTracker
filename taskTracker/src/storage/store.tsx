import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    tasks: taskReducer,

  },
});
export default store;
