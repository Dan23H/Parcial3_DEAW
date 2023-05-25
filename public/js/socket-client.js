const socket = io()

socket.on('connect',() => {
    console.log('Connected', socket.id)
})

const payload = {
    id: socket.id,
    msg: "a",
    from: socket.name
}

socket.broadcast.emit('mensaje-de-usuario',
payload,
(data) => {
    console.log('Respuesta al anuncio', data)
})

socket.on('disconnect', () => {
    console.log('Disconnected')
})