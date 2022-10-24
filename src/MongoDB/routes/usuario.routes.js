'use strict'

const express = require('express');
const userController = require('../controllers/usuario.controller');
const api = express.Router();

//Rutas Públicas//
api.get('/testUser', userController.userTest);
api.get('/getUsers', userController.getUsers);
api.get('/getUser/:id', userController.getUser);

api.post('/saveUser', userController.addUser);
api.put('/updateUser', userController.updateUser);
api.delete('/deleteUser', userController.deleteUser);

api.post('/login', userController.login);

module.exports = api;