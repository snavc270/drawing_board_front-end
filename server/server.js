import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  //broadcast when someone joins the server 
  io.emit("users", io.engine.clientsCount); 

  socket.on("getUsers", () => {
    io.emit("users", io.engine.clientsCount); 
  }); 
  // Someone drew a line: send it to everyone else
  socket.on("draw", (line) => {
    socket.broadcast.emit("draw", line);
  });

  // Someone cleared the board: tell EVERYONE, including them
  socket.on("clear", () => {
    io.emit("clear");
  });

  socket.on("disconnect", () => {
    console.log("User left:", socket.id);
    io.emit("users", io.engine.clientsCount); 
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
