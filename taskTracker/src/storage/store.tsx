import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import sheduleReducer from './sheduleSlice';
import deleteReducer from './deleteSlice';
import delegateReducer from './delegateSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    todo: todoReducer,
    shedule: sheduleReducer,
    delegate: delegateReducer,
    delete: deleteReducer,
  },
});
store.subscribe(() => {
  console.log('State updated:', store.getState());
});
export default store;
