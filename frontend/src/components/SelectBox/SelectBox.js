import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const SelectBox = forwardRef((props, ref) => {
  let [selectValue, setSelectValue] = useState(props.initialValue);

  const onChangeHandler = (e) => {
    if (props.onChangeHandler === "set") {
      setSelectValue(e.target.value);
    } else {
      props.onChangeHandler(e.target.value);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction() {
      return {
        type: props.refType,
        value: selectValue,
      };
    },
  }));

  return (
    <div>
      <InputLabel id={props.labelId}>Operator</InputLabel>
      <Select
        labelId={props.labelId}
        id={props.id}
        value={selectValue}
        onChange={onChangeHandler}
      >
        {props.menuItems.map((item, idx) => {
          return (
            <MenuItem key={idx} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
});

export default SelectBox;
