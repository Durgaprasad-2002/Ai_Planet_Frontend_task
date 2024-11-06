import { IoMdAdd } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";

function EachHistory({ title, active }) {
  return (
    <div className={`history ${active && "active-history"}`}>
      <AiOutlineMessage className="chat-icon" />
      <p>{title}</p>
    </div>
  );
}

export default function ChatSidebar() {
  return (
    <>
      <div className="chat-sidebar">
        <div className="titles">
          <img
            className="ai-logo"
            alt="ai-logo"
            src="https://t4.ftcdn.net/jpg/03/67/29/85/360_F_367298535_nS4GT4OqExlZkJDyJs8tJs86ptIrMFy0.jpg"
          />
          <h3>openAGI</h3>
        </div>

        <button className="newchat-btn">
          {" "}
          <IoMdAdd /> Start new chat
        </button>
        <br />
        <br />
        <p>CHAT HISTORY</p>
        <div className="chat-history-container">
          {[1, 2, 3, 4, 5].map((ele, ind) => (
            <EachHistory
              key={ind}
              active={ind === 0 && true}
              title={"Create 10 people for the security of the company"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
