import { Server as ServerIO } from "socket.io";
import Cors from 'cors'
const cors = Cors({
    origin: "http://localhost:3000",
    methods: ['POST', 'GET', 'HEAD'],
})
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            console.log(req)
            if (!res.socket.server.io) {
                console.log("New Socket.io server...");
                // adapt Next's net Server to http Server
                const httpServer = res.socket.server;
                const io = new ServerIO(httpServer, {
                    path: "/api/socketio",
                    cors: {
                        allowedHeaders: ["my-custom-header"],
                        credentials: true
                    }
                });
                res.socket.server.io = io;
                io.on("connection", (socket) => {
                    console.log("connection")
                });
            }
            res.end();
            return resolve(result)
        })
    })
}

export default async function handler(req, res) {

    await runMiddleware(req, res, cors)

}