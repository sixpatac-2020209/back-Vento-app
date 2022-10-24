'use strict'

const express = require('express');
const usuariosController = require('../../controllers/VENTOAPP/usuarios.controller')
const api = express.Router();

api.post('/createUserSAE', usuariosController.addUserSQL);
api.put('/updateUserSAE/:id', usuariosController.updateUserSQL);
api.delete('/deleteUserSAE/:id', usuariosController.deleteUserSQL);

module.exports = api