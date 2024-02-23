const express = require ('express')
const app = express()
const http = require('http')
const cors = require('cors')
app.use(cors())
const server = http.createServer(app) 
const { Server } = require('socket.io')
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"],
    },
})
io.on('connection',(socket) =>{ 
    console.log('USER CONNECTED; Socket ID = ',socket.id)

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with ID: ${socket.id}, joined room: ${data}`)
    })

    socket.on("send_message",(data) => {
        //console.log(data)
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log('USER DISCONNECTED; Socket ID = ',socket.id)
    })
})
server.listen(3001, () => {
    console.log('SERVER RUNNING')
})  