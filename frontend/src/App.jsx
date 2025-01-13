import Editor from "@monaco-editor/react";
import { useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:4000");

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const joinRoom = () => {
    // console.log(roomId, username);

    if (roomId && username) {
      socket.emit("join", { roomId, username });
      setJoined(true);
    }
  };

  const copyRoomId = () => {};

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  if (!joined) {
    return (
      <div className="join-container">
        <div className="join-form">
          <h1>Join Code Room</h1>

          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="sidebar">
        <div className="room-info">
          <h2>Code Room: {roomId}</h2>
          <button className="copy-button" onClick={copyRoomId}>
            Copy ID
          </button>
        </div>

        <h3>Users in Room</h3>
        <ul>
          <li>Sachin</li>
          <li>Sehwag</li>
        </ul>

        <p className="typing-indicator">user typing...</p>

        <select className="language-selector">
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <button className="leave-button">Leave Room</button>
      </div>

      <div className="editor-wrapper">
        <Editor
          height={"100%"}
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
};

export default App;
