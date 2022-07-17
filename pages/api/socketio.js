import { Server as ServerIO } from "socket.io";

export default function handler(req, res) {
    if (!res.socket.server.io) {

        console.log("New Socket.io server...");

        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
            cors: {
                origin: "http://localhost:8080"
            }
        });
        res.socket.server.io = io;
        io.on("connection", (socket) => {
            console.log("connection")
        });

    }
    res.end();
}