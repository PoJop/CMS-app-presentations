import { Server as ServerIO } from "socket.io";

export default function handler(req, res) {
    if (!res.socket.server.io) {

        console.log("New Socket.io server...");

        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
            origins: ["http://localhost:8080"],

            handlePreflightRequest: (req, res) => {
                res.writeHead(200, {
                    "Access-Control-Allow-Origin": "http://localhost:8080",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS ",
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