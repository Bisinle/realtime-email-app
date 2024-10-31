import io from "socket.io-client";

let socket;

export const initializeSocket = (userId) => {
  socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("Socket connected");
    // Set up user's notification channel
    socket.emit("setup", userId);
  });

  return socket;
};

export const getSocket = () => socket;
