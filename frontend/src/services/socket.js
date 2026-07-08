import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_API_URL ||
  "https://online-complaint-management-system-1-6vd8.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;