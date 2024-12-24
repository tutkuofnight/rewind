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

    socket.on("set", (data) => {
        socket.broadcast.emit("set", data)
    })

    socket.on("play", (state) => {
        socket.broadcast.emit("play", state)
    })
    
    socket.on("pause", (state) => {
        socket.broadcast.emit("pause", state)
    })

    socket.on("timeSeeked", (duration) => {
        socket.broadcast.emit("timeSeeked", duration)
    })
})

server.listen(port, () => {
    console.log(`websocket server running on ${port}`)
})