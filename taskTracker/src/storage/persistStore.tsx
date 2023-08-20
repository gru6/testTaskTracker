import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import todoReducer from "./todoSlice";
import scheduleReducer from "./sсheduleSlice";
import deleteReducer from "./deleteSlice";
import delegateReducer from "./delegateSlice";
import filterReducer from "./filterSlice";

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  todo: todoReducer,
  schedule: scheduleReducer,
  delegate: delegateReducer,
  delete: deleteReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: "root",
  storage: createIdbStorage(),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);



export { store, persistor };
