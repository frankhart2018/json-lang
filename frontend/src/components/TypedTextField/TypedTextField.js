import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import SelectBox from "../SelectBox/SelectBox";

const TypedTextField = forwardRef((props, ref) => {
  let [fieldType, setFieldType] = useState("integer");
  let [fieldValue, setFieldValue] = useState("");
  let [isSpecialType, setIsSpecialType] = useState(false);

  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    childFunction() {
      return {
        type: fieldType,
        value: isSpecialType
          ? childRef.current.childFunction().value
          : fieldValue,
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

  const menuItems = [
    {
      label: "Get from stack",
      value: "get_stack",
    },
  ];

  const refDataTemplate = {
    value: "self",
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
          <SelectBox
            initialValue="get_stack"
            onChangeHandler="set"
            refDataTemplate={refDataTemplate}
            labelId="special-type-label"
            id="special-type"
            menuItems={menuItems}
            ref={childRef}
          />
        </>
      )}
    </div>
  );
});

export default TypedTextField;
