import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  Company: "",
  token: "",
  mode: "employees",
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
    setMode: (state, action) => {
      state.mode = action.payload as "employees" | "candidates";
    },
  },
});

export const { setCompany, setToken, setMode } = globalSlice.actions;
export default globalSlice.reducer;
