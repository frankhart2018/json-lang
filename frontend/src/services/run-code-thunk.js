import { createAsyncThunk } from "@reduxjs/toolkit";
import * as run_code_service from "./run-code-service";

export const runCodeThunk = createAsyncThunk("run/runCode", async (payload) => {
  const response = await run_code_service.runCode(payload.code);
  return response;
});
