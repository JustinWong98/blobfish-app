import express from 'express'
import {createServer} from 'http'
import cors from 'cors'
import { Server } from "socket.io";

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
})

app.use(cors())

const PORT = process.env.PORT || 3004;

app.get('/', (req, res) => {
  res.send('running')
})

io.on('connection', (socket) => {
  socket.emit('me', socket.id);
  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected')
  })

  socket.on('callUser', ({userToCall, signalData, from, name}) => {
    io.to(userToCall).emit('callUser', {signal:signalData, from, name})
  })

  socket.in('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  })
})

server.listen(PORT, () => { console.log (`${PORT} is on`)})


