import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  money: 100000,
};

const money = createSlice({
  name: 'money',
  initialState,
  reducers: {
    setMoney:(state, action)=>{
      state.money = action.payload
    }
  },
});

export const { setMoney } = money.actions;

export default money.reducer;
