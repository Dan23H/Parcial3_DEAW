const express = require('express')
const Usuario = require('../models/UsuarioScheme')
const Message = require('../models/MessageScheme')

const registerUsuario = async (req, res = express.response) => {
    const { name, password } = req.body
    try {
        console.log(req.body)
        let usuario = await Usuario.findOne({name:name})
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese nombre de usuario ya existe',
            })
        }
        
        usuario = new Usuario(req.body)
        await usuario.save()

        return (
            res.status(200).json({
                ok: true,
                usuario,
            })
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }

}

const loginUsuario = async (req, res = express.response) => {
    const {name, password} = req.body
    console.log(req.body)
    try{
        let usuario = await Usuario.findOne({name:name})
        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario NO existe'
            })
        }

        res.status(200).json({
            ok: true,
            usuario
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            error
        })
    }
}

const anunciarMensaje = async (req, res = express.response) => {
    const { msg } = req.body
    try {
        console.log(req.body.msg)      
        let usuario = await Usuario.findOne({name:name})
        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario NO existe'
            }) 
        }
        console.log(usuario)
        let message = new Message(req.body)
        await message.save()

        return (
            res.status(200).json({
                ok: true,
                message,
            })
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}

module.exports = {
    registerUsuario,
    loginUsuario,
    anunciarMensaje,

}