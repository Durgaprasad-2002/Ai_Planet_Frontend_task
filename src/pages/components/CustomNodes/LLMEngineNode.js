import React, { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import "../../styles.css";

function LLMEngineNode({ data }) {
  const [isValid, setIsValid] = useState({
    apiBase: true,
    apiKey: true,
    maxTokens: true,
    temperature: true,
  });

  const [fields, setFields] = useState({
    modelName: "gpt-3.5",
    apiBase: "",
    apiKey: "",
    maxTokens: "",
    temperature: "",
  });

  const validateField = (key, value) => value.trim() !== "";

  const handleChange = (event, key) => {
    const value = event.target.value;
    setFields((prevFields) => ({ ...prevFields, [key]: value }));
    setIsValid((prevValid) => ({
      ...prevValid,
      [key]: validateField(key, value),
    }));
  };

  const nodeStyle = {
    border: Object.values(isValid).every(Boolean)
      ? "1px solid black"
      : "2px solid red",
  };

  useEffect(() => {
    const Valid = Object.values(isValid).every(Boolean);
    data.updateValidation(Valid);
  }, [isValid, data]);

  return (
    <div className="node llm-node" style={nodeStyle}>
      <h3>LLM Engine</h3>
      <div>
        <label>Model Name</label>
        <input
          value={fields.modelName}
          onChange={(e) => handleChange(e, "modelName")}
        />
      </div>
      <div>
        <label>API Base</label>
        <input
          value={fields.apiBase}
          onChange={(e) => handleChange(e, "apiBase")}
          style={{
            border: isValid.apiBase ? "1px solid black" : "2px solid red",
          }}
        />
      </div>
      <div>
        <label>API Key</label>
        <input
          value={fields.apiKey}
          onChange={(e) => handleChange(e, "apiKey")}
          style={{
            border: isValid.apiKey ? "1px solid black" : "2px solid red",
          }}
        />
      </div>
      <div>
        <label>Max Tokens</label>
        <input
          value={fields.maxTokens}
          onChange={(e) => handleChange(e, "maxTokens")}
          style={{
            border: isValid.maxTokens ? "1px solid black" : "2px solid red",
          }}
        />
      </div>
      <div>
        <label>Temperature</label>
        <input
          value={fields.temperature}
          onChange={(e) => handleChange(e, "temperature")}
          style={{
            border: isValid.temperature ? "1px solid black" : "2px solid red",
          }}
        />
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
}

export default LLMEngineNode;
