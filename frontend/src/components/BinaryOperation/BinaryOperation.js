import { InputLabel, MenuItem, Select } from "@mui/material";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TypedTextField from "../TypedTextField/TypedTextField";

const BinaryOperation = forwardRef((_props, ref) => {
  let [operator, setOperator] = useState("+");

  const childRef = useRef([]);

  useImperativeHandle(ref, () => ({
    childFunction() {
      let data = [];
      data.push(childRef.current[0].childFunction());
      data.push({
        type: "operator",
        value: operator,
      });
      data.push(childRef.current[1].childFunction());

      return data;
    },
  }));

  return (
    <div>
      <TypedTextField
        fieldLabel="Left operand"
        ref={(el) => (childRef.current[0] = el)}
      />
      <br />
      <InputLabel id="operator-type-label">Operator</InputLabel>
      <Select
        labelId="operator-type-label"
        id="operator-type"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
      >
        <MenuItem value="+">+ (Addition)</MenuItem>
        <MenuItem value="-">- (Subtraction)</MenuItem>
        <MenuItem value="*">* (Multiplication)</MenuItem>
        <MenuItem value="/">/ (Division)</MenuItem>
        <MenuItem value="%">% (Modulus)</MenuItem>
      </Select>
      <br />
      <br />
      <TypedTextField
        fieldLabel="Right operand"
        ref={(el) => (childRef.current[1] = el)}
      />
    </div>
  );
});

export default BinaryOperation;
