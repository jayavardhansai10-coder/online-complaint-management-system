import { io } from "socket.io-client";

const getSocketURL = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (process.env.NODE_ENV === "production") {
    return window.location.origin;
  }
  return "http://localhost:5000";
};

const socket = io(getSocketURL(), {
  transports: ["websocket"],
});

export default socket;