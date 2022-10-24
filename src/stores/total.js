import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
};

const total = createSlice({
  name: "total",
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const {setTotal} = total.actions

export default total.reducer