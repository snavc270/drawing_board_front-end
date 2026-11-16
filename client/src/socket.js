import { io } from "socket.io-client";

// One shared connection for the whole app
export const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:3000");
