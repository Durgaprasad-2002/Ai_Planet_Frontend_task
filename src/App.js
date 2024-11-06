import WorkFlowHome from "./pages/WorkFlowHome";
import ChatHome from "./pages/ChatHome";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<WorkFlowHome />} />
          <Route path="/chat" element={<ChatHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
