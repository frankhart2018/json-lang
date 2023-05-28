import { TextField } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const Input = forwardRef((_props, ref) => {
  let [variableName, setVariableName] = useState("");
  let [promptValue, setPromptValue] = useState("");

  useImperativeHandle(ref, () => ({
    childFunction() {
      return [
        {
          type: "object",
          value: variableName,
        },
        {
          type: "string",
          value: promptValue,
        },
      ];
    },
  }));

  return (
    <div>
      <TextField
        label="Variable name"
        variant="outlined"
        value={variableName}
        onChange={(e) => setVariableName(e.target.value)}
      />
      <br />
      <br />
      <TextField
        label="Prompt value"
        variant="outlined"
        sx={{
          width: "50%",
        }}
        value={promptValue}
        onChange={(e) => setPromptValue(e.target.value)}
      />
    </div>
  );
});

export default Input;
