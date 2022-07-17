import { Server as ServerIO } from "socket.io";

export default function handler(req, res) {
    console.log(req)
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        // adapt Next's net Server to http Server
        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
        });
        res.socket.server.io = io;
        io.on("connection", (socket) => {
            console.log("connection")
        });
    }
    res.end();
}