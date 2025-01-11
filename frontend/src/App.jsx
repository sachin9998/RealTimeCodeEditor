import { useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:4000");

const App = () => {
  const [joined, setJoined] = useState(false);

  if (!joined) {
    return <div>App not Joined</div>;
  }

  return <div>User Joined</div>;
};

export default App;
