import React from "react";
import { Handle, Position } from "@xyflow/react";
import "../../styles.css";

function OutputNode({ data }) {
  return (
    <div className="node output-node">
      <h3>OUTPUT</h3>
      <p>Output is shown here</p>
      <Handle type="target" position={Position.Left} id="input" />
    </div>
  );
}

export default OutputNode;
