require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./src/routes')

const PORT = process.env.PORT || 6000

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/uploads', express.static('./uploads'))

io.on('connection', (socket) => {
  console.log('User connect')

  socket.on('join-room', (data) => {
    data.map(room => {
      console.log(`Join to ${room}`)
      socket.join(room)
    })
  })

  socket.on('newUser', async (data) => {
    socket.broadcast.emit('broadcast', `Global: ${data.name} telah bergabung di Mangga Chat`);
  })

  socket.on('joinRoom', async (data) => {
    console.log(`Join to room ${data.room}`)
    socket.join(data.room)
  })

  socket.on('addFriend', data => {
    io.emit('notifAddFriend', data)
  })
  socket.on('inviteFriend', async data => {
    // let myRoom = await Room.findById(data.room, {
    //   messages: {
    //     $slice: -10
    //   }
    // }).populate('members').populate({
    //   path: 'messages',
    //   populate: ('idUser')
    // })
    // io.emit('notifinviteFriend', {
    //   myRoom,
    //   ...data
    // })
  })
  socket.on('createPrivate', data => {
    io.emit('notifCreatePrivate', data)
  })
  socket.on('accFriend', data => {
    io.emit('notifAccFriend', data)
  })
  socket.on('rejectFriend', data => {
    io.emit('notifRejectFriend', data)
  })
  socket.on('deleteFriend', data => {
    io.emit('notifDeleteFriend', data)
  })
  socket.on('typing', data => {
    socket.broadcast.to(data.room).emit('typingNotif', {
      notif: `${data.name} sedang mengetik`,
      message: data.message,
      room: data.room
    })
  })

  socket.on('sendMessage', async (data) => {
    console.log(data)
    // socket.broadcast.emit('broadcast', `${data.senderId}: ${data.message}`);
    let notif = ''
    if (data.type === 1) {
      notif = `<b>${data.name}</b>: ${data.message}`
    } else {
      notif = `<b>${data.roomName}</b>:(${data.name}) ${data.message}`
    }
    if(data.sendWhat === 10){
      console.log('10')
    }else{

      socket.broadcast.to(data.room).emit('notifPesan', {notif: notif, data:data})
    }
    io.to(data.room).emit('sendMessageHandle', {
      ...data
    })
  })

  socket.on('disconnect', () => {
    console.log('User disconnect')
  })
})

app.use('/api/v1', routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status_code: 404,
    message: 'Page not found',
  })
})

http.listen(PORT, () => console.log(`Server running on port ${PORT}`))