const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { registerUsuario, loginUsuario, anunciarMensaje } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')

router.post(
    '/register', 
    [   
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe tener como mínimo 8 caracteres').isLength({ min: 8 }),
        validarCampos
    ], 
    registerUsuario)
router.post(
    '/login', 
    [   
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    loginUsuario)
router.post(
    '/home', anunciarMensaje)

module.exports = router