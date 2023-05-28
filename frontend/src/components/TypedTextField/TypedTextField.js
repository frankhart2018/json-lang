import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const TypedTextField = forwardRef((props, ref) => {
  let [fieldType, setFieldType] = useState("integer");
  let [fieldValue, setFieldValue] = useState("");
  let [isSpecialType, setIsSpecialType] = useState(false);
  let [specialType, setSpecialType] = useState("get_stack");

  useImperativeHandle(ref, () => ({
    childFunction() {
      return {
        type: fieldType,
        value: isSpecialType ? specialType : fieldValue,
      };
    },
  }));

  const onChangeFieldType = (e) => {
    setFieldType(e.target.value);
    if (e.target.value === "special") {
      setIsSpecialType(true);
    } else {
      setIsSpecialType(false);
    }
  };

  return (
    <div>
      <InputLabel id="field-type-label">Data Type</InputLabel>
      <Select
        labelId="field-type-label"
        id="field-type"
        value={fieldType}
        onChange={onChangeFieldType}
      >
        <MenuItem value="integer">Integer</MenuItem>
        <MenuItem value="object">Object</MenuItem>
        <MenuItem value="string">String</MenuItem>
        <MenuItem value="special">Special</MenuItem>
      </Select>
      {!isSpecialType && (
        <TextField
          label={props.fieldLabel}
          variant="outlined"
          sx={{
            marginLeft: "10px",
          }}
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
      )}
      {isSpecialType && (
        <>
          <InputLabel id="special-type-label">Special Type</InputLabel>
          <Select
            labelId="special-type-label"
            id="special-type"
            value={specialType}
            onChange={setSpecialType}
          >
            <MenuItem value="get_stack">Get from stack</MenuItem>
          </Select>
        </>
      )}
    </div>
  );
});

export default TypedTextField;
