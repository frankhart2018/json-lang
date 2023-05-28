import { createSlice } from "@reduxjs/toolkit";
import { runCodeThunk } from "../services/run-code-thunk";

let initialState = {
  runningCode: false,
  output: "",
};

const runCodeSlice = createSlice({
  name: "runCode",
  initialState,
  reducers: {},
  extraReducers: {
    [runCodeThunk.pending]: (state, action) => {
      state.runningCode = true;
    },
    [runCodeThunk.fulfilled]: (state, action) => {
      state.runningCode = false;
      state.output =
        action.payload.data.status === "success"
          ? action.payload.data.stdout
          : action.payload.data.stderr;
    },
    [runCodeThunk.rejected]: (state, action) => {
      state.runningCode = false;
    },
  },
});

export default runCodeSlice.reducer;
