const express = require('express')
const http = require ('http')
const path = require('path')
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection',(socket)=>{
    socket.on('user-message',(message)=>{
        console.log("NEW MESSAGE FROM USER : ", message);
        socket.broadcast.emit('message', message);
    })
})
app.use(express.static(path.resolve('./public')))

app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html")
})

server.listen(3000,()=>{
    console.log("SERVER STARTED AT PORT 3000");
})