// src/contexts/WebSocketContext.tsx
import { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getStoredUser } from "./auth";

//Websocket Algorithm
//Note: useWebSocket is a context from WebSocketContext.
//1. I created a global websocket for all real time connections on the platform
//2. The globalSocket is called at the App.tsx
//3. To use socket connections on different pages just call useWebSocket
//4. All triggers are on the realtime app on the backend project, you can modify the events there
//5. PS. Hope you understand sockets, coz now i do more ... Have fun! -> Commented on June 14, 2025

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const userLogin = getStoredUser();
  console.log(userLogin?.user?.account_id);

  const connectWebSocket = () => {
    if (!user) return;

    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_HOST}/ws/global/?user_id=${
        userLogin?.user?.account_id
      }`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Global WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "user_logged_in") {
        console.log(`${data.username} just logged in`);
      }
    };

    socket.onclose = () => {
      console.log("Global WebSocket disconnected, retrying in 3 seconds...");
      socketRef.current = null;
      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      socket.close();
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [user]);

  return (
    <WebSocketContext.Provider value={socketRef}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
