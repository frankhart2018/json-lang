import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import "./InstructionSection.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import BinaryOperation from "../BinaryOperation/BinaryOperation";
import Input from "../Input/Input";
import Print from "../Print/Print";
import Var from "../Var/Var";
import SelectBox from "../SelectBox/SelectBox";

const InstructionSection = forwardRef((_props, ref) => {
  const childRef = useRef([]);

  let [instructionComponent, setInstructionComponent] = useState(
    <BinaryOperation ref={(el) => (childRef.current[0] = el)} />
  );
  let [pushToStack, setPushToStack] = useState(false);

  const onChangeInstructionType = (e) => {
    switch (e.target.value) {
      case "binary_op":
        setInstructionComponent(
          <BinaryOperation ref={(el) => (childRef.current[0] = el)} />
        );
        break;
      case "input":
        setInstructionComponent(
          <Input ref={(el) => (childRef.current[0] = el)} />
        );
        break;
      case "print":
        setInstructionComponent(
          <Print ref={(el) => (childRef.current[0] = el)} />
        );
        break;
      case "var":
        setInstructionComponent(
          <Var ref={(el) => (childRef.current[0] = el)} />
        );
        break;
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction() {
      return {
        instruction: childRef.current[1].childFunction().instruction,
        action: pushToStack ? "store_stack" : "",
        values: childRef.current[0].childFunction(),
      };
    },
  }));

  const menuItems = [
    {
      label: "Binary Operation",
      value: "binary_op",
    },
    {
      label: "Input",
      value: "input",
    },
    {
      label: "Print",
      value: "print",
    },
    {
      label: "Create variable",
      value: "var",
    },
  ];

  const refDataTemplate = {
    instruction: "self",
  };

  return (
    <div className="instruction-section">
      {/* <InputLabel id="instruction-type-label">Instruction Type</InputLabel>
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
      </Select> */}
      <SelectBox
        initialValue="binary_op"
        onChangeHandler={onChangeInstructionType}
        refDataTemplate={refDataTemplate}
        labelId="instruction-type-label"
        id="instruction-type"
        menuItems={menuItems}
        ref={(el) => (childRef.current[1] = el)}
      />

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
