import { MdOutlineContentCopy } from "react-icons/md";
import { RiRestartLine } from "react-icons/ri";

export default function Response({ query, response }) {
  return (
    <div className="query-response">
      <div className="query-box">
        <div className="icon-box">
          <p>S</p>
        </div>
        <p className="query">{query}</p>
      </div>
      <div className="vertical-bar"></div>
      <div className="response-box">
        <div className="icon-box">
          <img
            className="hand-img"
            alt="hand"
            src="https://w7.pngwing.com/pngs/545/669/png-transparent-writing-cartoon-drawing-comics-writing-comics-pencil-hand-thumbnail.png"
          />
        </div>
        <div>
          <p className="response">{response}</p>
          <div className="res-icons-container">
            <RiRestartLine className="res-icon" />
            <MdOutlineContentCopy className="res-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
