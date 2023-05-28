import { TextField } from "@mui/material";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TypedTextField from "../TypedTextField/TypedTextField";

const Var = forwardRef((_props, ref) => {
  let [variableName, setVariableName] = useState("");

  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    childFunction() {
      return [
        {
          type: "object",
          value: variableName,
        },
        childRef.current.childFunction(),
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
      <TypedTextField fieldLabel="Value" ref={childRef} />
    </div>
  );
});

export default Var;
