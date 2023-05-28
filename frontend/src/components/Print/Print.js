import React, { forwardRef, useImperativeHandle, useRef } from "react";
import TypedTextField from "../TypedTextField/TypedTextField";

const Print = forwardRef((_props, ref) => {
  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    childFunction() {
      return [childRef.current.childFunction()];
    },
  }));

  return (
    <div>
      <TypedTextField fieldLabel="Value" ref={childRef} />
    </div>
  );
});

export default Print;
