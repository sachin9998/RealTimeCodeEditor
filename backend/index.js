import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Conncted :", socket.id);
});

server.listen(port, () => {
  console.log("Server is running at port: ", port);
});
