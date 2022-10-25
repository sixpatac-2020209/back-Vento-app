'use strict'

const express = require('express');
const userController = require('../controllers/usuario.controller');
const api = express.Router();
const mdAuth = require('../middlewares/authenticated');

//Rutas Públicas//
api.get('/testUser', mdAuth.ensureAuth, userController.userTest);
api.get('/getUsers', mdAuth.ensureAuth, userController.getUsers);
api.get('/getUser/:id', mdAuth.ensureAuth, userController.getUser);

api.post('/saveUser', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.addUser);
api.put('/updateUser', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.updateUser);
api.delete('/deleteUser', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.deleteUser);

api.post('/login', userController.login);

module.exports = api;