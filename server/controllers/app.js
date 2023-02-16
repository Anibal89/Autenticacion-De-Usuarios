const express = require('express');

const router = express.Router();

//controladores

const register = require('./register')
const login = require('./login')
const createNote = require('./createNote')
const updateNote = require('./updateNote')
const deleteNote = require('./deleteNote')
const logout = require('./logout')
const isLogged = require('./isLogged');
const getNotes = require('./getNotes');

//rutas
router.post('/register', register)
router.post('/login', login)
router.post('/createnote', createNote)
router.post('/updateNote', updateNote)
router.post('/deleteNote', deleteNote)
router.get('/logout', logout)
router.get('/isLogged', isLogged)
router.get('/getNotes',getNotes)

module.exports =  router;