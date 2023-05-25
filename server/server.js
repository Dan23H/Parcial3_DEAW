const express = require('express')
require('dotenv').config()
const { dbConnection } = require('../database/config')
const cors = require('cors')
const {socketController} = require('../sockets/controller')
const PORT = process.env.PORT || 27000

class Server {
    constructor() {
        // Crear Express App
        this.app = express()
        this.port = PORT
        this.server = require('http').createServer(this.app)
        this.sckt = require('socket.io')(this.server)

        this.paths = {
            auth: '/api/parcial'
        }

        this.connectToBD()
        this.addMiddlewares()
        this.setRoutes()
        this.sockets()
    }

    // MongoDB
    async connectToBD() {
        await dbConnection()
    }

    addMiddlewares() {
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body

        this.app.use(express.json())

        // Public folder
        this.app.use(express.static('public'))
    }

    setRoutes() {
        // Rutas
        this.app.use(this.paths.auth, require('../routes/auth'))
    }

    sockets(){
        this.sckt.on('connection', socket => {
            console.log('Usuario Conectado', socket.id)
            socket.on('mensaje-de-usuario',(payload,callback)=> {
                console.log(payload)
                callback('Tu mensaje fue recibido!')
                payload.from = socket.name
                this.sckt.broadcast.emit(socket.id, payload)
            })

            socket.on('disconnect', () => {
                console.log('Usuario Desconectado')
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server Is Now Running In Port:', PORT)
        })
    }
}

module.exports = Server