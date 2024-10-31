import io from "socket.io-client";

let socket;

export const initializeSocket = (userId) => {
  socket = io(`${import.meta.env.VITE_API_BASE_URL}`);

  socket.on("connect", () => {
    console.log("Socket connected");
    // Set up user's notification channel
    socket.emit("setup", userId);
  });

  return socket;
};

export const getSocket = () => socket;
