'use strict'

const express = require('express');
const usuariosController = require('../../controllers/VENTOAPP/usuarios.controller')
const api = express.Router();
const mdAuth = require('../../middlewares/authenticated');

api.post('/createUserSAE', [mdAuth.ensureAuth, mdAuth.isAdmin], usuariosController.addUserSQL);
api.put('/updateUserSAE/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], usuariosController.updateUserSQL);
api.delete('/deleteUserSAE/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], usuariosController.deleteUserSQL);

api.get('/getUserSae/:id')
module.exports = api