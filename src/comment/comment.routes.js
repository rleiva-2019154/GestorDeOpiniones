'use strict'

import { Router } from "express"
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { 
    testComment,
    saveComment,
    updateComment,
    deleteComment 
} from "./comment.controller.js"

const api = Router()

api.get('/testComment', testComment)
api.post('/saveComment', saveComment)
api.put('/updateComment/:id', updateComment)
api.delete('/deleteComment/:id', deleteComment)


export default api