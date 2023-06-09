import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { runCodeThunk } from "../../services/run-code-thunk";
import InstructionSection from "../InstructionSection/InstructionSection";
import { enqueueSnackbar } from "notistack";
import "./CodeEditor.css";

const CodeEditor = () => {
  let [instructionSections, setInstructionSections] = useState([]);
  let [instructionCount, setInstructionCount] = useState(0);

  let { runningCode, output } = useSelector((state) => state.runCode);

  const childRef = useRef([]);
  const dispatch = useDispatch();

  const addInstructionSection = () => {
    let newInstructionCount = instructionCount + 1;
    const newInstructionSection = (
      <InstructionSection
        ref={(el) => (childRef.current[newInstructionCount] = el)}
      />
    );
    setInstructionCount(newInstructionCount);
    setInstructionSections([...instructionSections, newInstructionSection]);
  };

  const onRunClicked = async () => {
    let data = [];
    childRef.current.forEach((child, idx) => {
      data.push({});
      data[idx - 1] = child.childFunction(data, idx);
    });
    let response = await dispatch(
      runCodeThunk({
        code: data,
      })
    );

    if (response.payload.data.status === "success") {
      enqueueSnackbar("Code ran successfully!", { variant: "success" });
    } else {
      enqueueSnackbar("Code failed to run!", { variant: "error" });
    }
  };

  return (
    <div>
      <div
        style={{
          float: "left",
        }}
      >
        <Button
          variant="contained"
          onClick={addInstructionSection}
          sx={{
            "margin-left": "10px",
            "margin-right": "10px",
          }}
        >
          Add instruction
        </Button>
        <Button
          variant="contained"
          sx={{
            "margin-left": "10px",
            "margin-right": "10px",
          }}
          onClick={onRunClicked}
        >
          Run
        </Button>
      </div>

      <br />
      <br />

      <div className="half-width float-left code-side">
        {instructionSections.map((instructionSection, idx) => {
          return <div key={idx}>{instructionSection}</div>;
        })}
      </div>

      {!runningCode && output !== "" && (
        <div className="box half-width float-right output-side">
          <div style={{ margin: "10px" }}>
            <>
              <strong>Output is: </strong>
              <pre>{output}</pre>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
