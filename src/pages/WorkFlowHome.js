import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "./styles.css";

import InputNode from "./components/CustomNodes/InputNode";
import LLMEngineNode from "./components/CustomNodes/LLMEngineNode";
import OutputNode from "./components/CustomNodes/OutputNode";
import Navbar from "./components/Navbar";
import SidebarComponents from "./components/SidebarComponents";

const nodeTypes = {
  input: InputNode,
  llm: LLMEngineNode,
  output: OutputNode,
};

const connectionRules = {
  input: ["llm"],
  llm: ["output"],
  output: [],
};

export default function WorkFlowHome() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [validationStatus, setValidationStatus] = useState({});
  const [validNodes, setValidNodes] = useState([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (!sourceNode || !targetNode) {
        console.error("Source or target node not found", {
          sourceNode,
          targetNode,
        });
        alert("One of the nodes in the connection is missing.");
        return;
      }

      if (connectionRules[sourceNode.type]?.includes(targetNode.type)) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        alert("This connection is not allowed.");
      }
    },
    [nodes]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const newPosition = {
        x: lastPosition.x + 100,
        y: lastPosition.y + 100,
      };

      const newNodeId = `${type}-${nodes.length + 1}`;

      const newNode = {
        id: newNodeId,
        type,
        position: newPosition,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
          onDelete: (id) =>
            setNodes((nds) => nds.filter((node) => node.id !== id)),
          validationStatus,
          updateValidation: (isValid) => {
            setValidationStatus((prev) => ({ ...prev, [newNodeId]: isValid }));
          },
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setValidationStatus((prev) => ({ ...prev, [newNodeId]: true }));
      setLastPosition(newPosition);
    },
    [lastPosition, nodes, validationStatus]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const validateNodes = () => {
    let allValid = true;
    const updatedValidationStatus = {};

    nodes.forEach((node) => {
      const isValid = node.data.validate ? node.data.validate() : true;
      updatedValidationStatus[node.id] = isValid;

      if (!isValid) {
        allValid = false;
      }
    });

    setValidationStatus(updatedValidationStatus);

    if (allValid) {
      setValidNodes(nodes);
      alert("All nodes are valid. Proceeding with the process.");
      makeApiCall();
    } else {
      alert("Some nodes are invalid. Please correct them.");
    }
  };

  const makeApiCall = () => {
    const inputNodes = nodes.filter(
      (node) => node.type === "input" && node.data.inputValue
    );
    const llmNodes = nodes.filter((node) => node.type === "llm");

    const inputs = inputNodes.map((node) => node.data.inputValue);
    const modelName = llmNodes[0]?.data.modelName || "gpt-3.5";

    const res = {
      llm: llmNodes,
      model: modelName,
      prompt: inputNodes,
      max_tokens: 100,
    };

    console.log(res);

    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify({
        model: modelName,
        prompt: inputs.join("\n"),
        max_tokens: 100,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("API Response: " + data.choices[0].text);
      })
      .catch((error) => {
        console.error("API call error:", error);
        alert("Failed to get a response from the API.");
      });
  };

  return (
    <>
      <Navbar onRunClick={validateNodes} />
      <div className="work-flow-outer">
        <div className="workflow-inputs-container">
          <SidebarComponents />
        </div>
        <div className="workflow-container">
          <div
            style={{ height: "90vh", width: "100vw" }}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );
}
