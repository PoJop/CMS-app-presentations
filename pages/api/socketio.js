import { Server as ServerIO } from "socket.io";

export default function handler(req, res) {
        console.log("New Socket.io server...");
    if (!res.socket.server.io) {
        // adapt Next's net Server to http Server
        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
            origin: "*",

            handlePreflightRequest: (req, res) => {
              res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "my-custom-header",
                "Access-Control-Allow-Credentials": true
              });
              res.end();
            }
        });
        res.socket.server.io = io;
        io.on("connection", (socket) => {
            console.log("connection")
        });
    }
    res.end();
}