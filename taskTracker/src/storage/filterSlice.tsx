import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: string[] = [];

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilterTag: (state, action: PayloadAction<{filter: string[]}> ) => {
      state.length = 0;
      state.push(...action.payload.filter);
    },
    delFilterTag: (state, action: PayloadAction<{filter: string[]}> ) => {
      state = state.filter(item => !action.payload.filter.includes(item));
      return state;
    }
   },
});

export const { addFilterTag, delFilterTag } = filterSlice.actions;
export default filterSlice.reducer;
