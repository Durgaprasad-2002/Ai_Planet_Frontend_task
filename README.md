# Project Name

## Overview

This project is an AI-driven flow management application built using React and React Flow library. It enables users to dynamically create and connect nodes representing different AI components like Input, LLM Engine, and Output. Users can interact with these nodes, validate input fields, and connect them logically for running the workflow.

## Table of Contents

1. [High-Level Design (HLD)](#high-level-design-hld)
2. [Low-Level Design (LLD)](#low-level-design-lld)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## High-Level Design (HLD)

### Objective

The main objective of the project is to build an interactive flow system where nodes are used to represent different stages of a process. The user can dynamically add nodes, connect them, validate inputs, and execute the flow. The nodes represent components such as Input, LLM Engine, and Output, and each node can be validated for correctness before execution.

### Components

1. **Input Node**:
   - The user can input text, which will be validated before moving forward in the flow.
2. **LLM Engine Node**:

   - The LLM Engine node interacts with the OpenAI API. It takes input from the Input Node, processes it, and generates results.

3. **Output Node**:

   - The Output node displays the results from the LLM Engine and allows users to finalize the process.

4. **Flow Management**:

   - Users can drag-and-drop nodes, connect them, and interact with the flow using React Flow.
   - Connections between nodes are managed by rules: Input can only connect to LLM, and LLM can only connect to Output.

5. **Validation**:

   - Each node has its own validation function to ensure the correctness of user inputs.
   - Validation is triggered when the "Run" button is clicked.

6. **State Management**:

   - The state is managed using React's `useState` and `useCallback` hooks, and the flow's status (valid or invalid) is stored in the state.

7. **API Integration**:
   - The application integrates with the OpenAI API to process data and generate results when the flow is executed.

---

## Low-Level Design (LLD)

### 1. **Component Structure**

#### Parent Component (Flow)

- Manages state for nodes, edges, and validation status.
- Handles the creation of new nodes, node connections, and validation logic.

```jsx
const Flow = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [validationStatus, setValidationStatus] = useState({});
  const [validNodes, setValidNodes] = useState([]);

  // Functions for managing node changes, edge changes, and connection logic.
};
```
