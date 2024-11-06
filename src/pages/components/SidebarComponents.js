import React from "react";
import "../styles.css";
import { LiaFileUploadSolid } from "react-icons/lia";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { LuCpu } from "react-icons/lu";

function InputComponent({ name, logo, type }) {
  const onDragStart = (event) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar-input" draggable onDragStart={onDragStart}>
      {logo}
      <p>{name}</p>
    </div>
  );
}

export default function SidebarComponents() {
  return (
    <div className="inputs-body">
      <h2 className="title">Components</h2>
      <h5 className="description">Drag and Drop</h5>
      <InputComponent name="Input" type="input" logo={<LiaFileUploadSolid />} />
      <InputComponent name="LLM Engine" type="llm" logo={<LuCpu />} />
      <InputComponent
        name="Output"
        type="output"
        logo={<LiaFileDownloadSolid />}
      />
    </div>
  );
}
