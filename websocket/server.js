const express = require("express")
const { createServer } = require("node:http")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://secret-rewind.vercel.app/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
})
const port = 3001

io.on("connection", (socket) => {
    console.log("a user connected")
    let room
    socket.on("join", ({ data }) => {
        console.log(data.user, data.room)
        socket.join(data.room, () => {
            room = data.room
            if (data.user) {
                socket.to(data.room).emit("joinedUser", data.user)
            }
        })
    })

    socket.on("set", (data) => {
        socket.to(room).emit("set", data)
    })

    socket.on("play", (state) => {
        socket.to(room).emit("play", state)
    })
    
    socket.on("pause", (state) => {
        socket.to(room).emit("pause", state)
    })

    socket.on("timeSeeked", (duration) => {
        socket.to(room).emit("timeSeeked", duration)
    })
})

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "hi, rewind!"
    })
})

server.listen(port, () => {
    console.log(`websocket server running on ${port}`)
})