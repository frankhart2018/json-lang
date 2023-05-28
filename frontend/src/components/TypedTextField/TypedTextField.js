import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const TypedTextField = forwardRef((props, ref) => {
  let [fieldType, setFieldType] = useState("integer");
  let [fieldValue, setFieldValue] = useState("");

  useImperativeHandle(ref, () => ({
    childFunction() {
      return {
        type: fieldType,
        value: fieldValue,
      };
    },
  }));

  return (
    <div>
      <InputLabel id="field-type-label">Data Type</InputLabel>
      <Select
        labelId="field-type-label"
        id="field-type"
        value={fieldType}
        onChange={(e) => setFieldType(e.target.value)}
      >
        <MenuItem value="integer">Integer</MenuItem>
        <MenuItem value="object">Object</MenuItem>
        <MenuItem value="string">String</MenuItem>
        <MenuItem value="special">Special</MenuItem>
      </Select>
      <TextField
        label={props.fieldLabel}
        variant="outlined"
        sx={{
          marginLeft: "10px",
        }}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
      />
    </div>
  );
});

export default TypedTextField;
