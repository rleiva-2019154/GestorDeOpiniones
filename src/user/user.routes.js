import express from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import {test, register, login, update, updatePassword } from './user.controller.js'

const api = express.Router()

//RUTAS PUBLICAS
api.post('/register', register)
api.post('/login', login)

//RUTAS PRIVADAS (solo usuarios logeados)
                        //Middleware
api.get('/test', [validateJwt, isAdmin], test)
api.put('/update/:id', [validateJwt], update) //Middleware -> funciones intermedias que sirven para validar
api.put('/updatePassword/:id', updatePassword)

export default api