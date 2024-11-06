import React from "react";
import { LuSend } from "react-icons/lu";

import Response from "./components/Response";
import ChatSidebar from "./components/ChatSidebar";

export default function ChatHome() {
  return (
    <div className="chat-body">
      {/* sidebar (contains history and new chat option) */}
      <ChatSidebar />

      <div className="chat-interface">
        <h3 className="chat-brand"> AI Assistant</h3>

        {/* Responses Conatiner */}
        <div className="responses">
          <Response
            query={"write a poem about the sunny morning"}
            response={
              "this principle marks a departure from the legacy of bookish learning which continues to shape our system and causes a gap between the school, home and community. The syllabi and textbooks developed on the basis of NCF signify an attempt to implement this basic idea. They also attempt to discourage rote learning and the maintenance of sharp boundaries between different subject areas. We hope these measures will take us significantly further in the direction of a child-centred system of education outlined in the National Policy on Education."
            }
          />
        </div>

        {/* Input field for question */}
        <div className="input-box">
          <div className="inner-box">
            <div
              contentEditable={true}
              placeholder="write your message..."
              className="input"
            ></div>
            <button className="send-btn">
              <LuSend className="send-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
