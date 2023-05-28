import React, { forwardRef, useImperativeHandle, useRef } from "react";
import TypedTextField from "../TypedTextField/TypedTextField";
import SelectBox from "../SelectBox/SelectBox";

const BinaryOperation = forwardRef((_props, ref) => {
  const childRef = useRef([]);

  useImperativeHandle(ref, () => ({
    childFunction() {
      let data = [];
      for (let i = 0; i < 3; i++) {
        data.push(childRef.current[i].childFunction());
      }
      return data;
    },
  }));

  const menuItems = [
    {
      label: "+ (Addition)",
      value: "+",
    },
    {
      label: "- (Subtraction)",
      value: "-",
    },
    {
      label: "* (Multiplication)",
      value: "*",
    },
    {
      label: "/ (Division)",
      value: "/",
    },
    {
      label: "% (Modulus)",
      value: "%",
    },
    {
      label: "** (Exponentiation)",
      value: "**",
    },
    {
      label: "< (Less than)",
      value: "<",
    },
    {
      label: "<= (Less than or equal to)",
      value: "<=",
    },
    {
      label: "> (Greater than)",
      value: ">",
    },
    {
      label: ">= (Greater than or equal to)",
      value: ">=",
    },
    {
      label: "== (Equal to)",
      value: "==",
    },
    {
      label: "!= (Not equal to)",
      value: "!=",
    },
  ];

  return (
    <div>
      <TypedTextField
        fieldLabel="Left operand"
        ref={(el) => (childRef.current[0] = el)}
      />
      <br />
      <SelectBox
        initialValue="+"
        onChangeHandler="set"
        labelId="operator-type-label"
        id="operator-type"
        menuItems={menuItems}
        refType="operator"
        ref={(el) => (childRef.current[1] = el)}
      />
      <br />
      <br />
      <TypedTextField
        fieldLabel="Right operand"
        ref={(el) => (childRef.current[2] = el)}
      />
    </div>
  );
});

export default BinaryOperation;
