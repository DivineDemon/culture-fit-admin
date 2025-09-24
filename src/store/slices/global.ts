import { createSlice } from "@reduxjs/toolkit";
import type { GlobalState } from "@/types";

const initialState: GlobalState = {
  Company: "",
  token: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.Company = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setCompany, setToken } = globalSlice.actions;
export default globalSlice.reducer;
