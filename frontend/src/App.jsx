import { useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:4000");

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUserName] = useState("");

  const joinRoom = () => {
    // console.log(roomId, username);

    if (roomId && username) {
      socket.emit("join", { roomId, username });
      setJoined(true);
    }
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

  return <div>User Joined</div>;
};

export default App;
