import express from 'express'
import {createServer} from 'http'
import cors from 'cors'
import { Server } from "socket.io";

const app = express()
app.use(cors())
const server = createServer(app)

const PORT = process.env.PORT || 3004;

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
})
io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected')
  })

  socket.on('calluser', ({userToCall, signalData, from, name}) => {
    io.to(userToCall).emit('calluser', {signal:signalData, from, name})
  })

  socket.in('answerCall', (data) => {
    io.to(data.to).emit('callaccepted', data.signal);
  })
})

app.get('/', (req, res) => {
  res.send('running')
})

server.listen(PORT, () => { console.log (`${PORT} is on`)})


