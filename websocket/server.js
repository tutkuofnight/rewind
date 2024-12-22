const express = require("express")
const { createServer } = require("node:http")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
})
const port = 3001

io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on("play", (data) => {
        socket.broadcast.emit("play", data)
    })

})

server.listen(port, () => {
    console.log(`websocket server running on ${port}`)
})