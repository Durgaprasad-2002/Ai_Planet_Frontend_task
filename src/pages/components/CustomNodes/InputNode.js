import React, { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import "../../styles.css";

function InputNode({ data }) {
  const [inputValue, setInputValue] = useState("");

  const validateField = (value) => value.trim() !== "";

  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const validate = () => {
    const isValid = validateField(inputValue);
    return isValid;
  };

  useEffect(() => {
    const isValid = validate();
    data.updateValidation(isValid);
  }, [inputValue, data]);

  const nodeStyle = {
    border: isValid ? "1px solid black" : "2px solid red",
  };

  return (
    <div className="node input-node" style={nodeStyle}>
      <h3>INPUT</h3>
      <input
        placeholder="Type input..."
        value={inputValue}
        onChange={handleChange}
        style={{
          border: isValid ? "1px solid black" : "2px solid red",
        }}
      />

      <Handle type="source" position={Position.Left} id="output" />
    </div>
  );
}

export default InputNode;
