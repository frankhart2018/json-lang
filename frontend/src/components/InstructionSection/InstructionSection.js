import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import "./InstructionSection.css";
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import BinaryOperation from "../BinaryOperation/BinaryOperation";
import Input from "../Input/Input";
import Print from "../Print/Print";
import Var from "../Var/Var";

const InstructionSection = forwardRef((_props, ref) => {
  let [instructionType, setInstructionType] = useState("binary_op");

  const childRef = useRef();

  let [instructionComponent, setInstructionComponent] = useState(
    <BinaryOperation ref={childRef} />
  );
  let [pushToStack, setPushToStack] = useState(false);

  const onChangeInstructionType = (e) => {
    setInstructionType(e.target.value);
    switch (e.target.value) {
      case "binary_op":
        setInstructionComponent(<BinaryOperation ref={childRef} />);
        break;
      case "input":
        setInstructionComponent(<Input ref={childRef} />);
        break;
      case "print":
        setInstructionComponent(<Print ref={childRef} />);
        break;
      case "var":
        setInstructionComponent(<Var ref={childRef} />);
        break;
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction() {
      return {
        instruction: instructionType,
        action: pushToStack ? "store_stack" : "",
        values: childRef.current.childFunction(),
      };
    },
  }));

  return (
    <div className="instruction-section">
      <InputLabel id="instruction-type-label">Instruction Type</InputLabel>
      <Select
        labelId="instruct-type-label"
        id="instruction-type"
        value={instructionType}
        onChange={onChangeInstructionType}
      >
        <MenuItem value="binary_op">Binary Operation</MenuItem>
        <MenuItem value="input">Input</MenuItem>
        <MenuItem value="print">Print</MenuItem>
        <MenuItem value="var">Create variable</MenuItem>
      </Select>

      <br />
      <br />

      <FormControlLabel
        control={
          <Checkbox
            value={pushToStack}
            onChange={(e) => setPushToStack(e.target.checked)}
          />
        }
        label="Push to stack"
      />

      <br />
      <br />

      {instructionComponent}
    </div>
  );
});

export default InstructionSection;
