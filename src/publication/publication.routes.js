'use strict'

import { Router } from "express"
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { 
    testPublication,
    savePublication,
    updatePublication,
    deletePublication
} from "./publication.controller.js"

const api = Router()

api.get('/testPublication', testPublication)
api.post('/savePublication', savePublication)
api.put('/updatePublication/:id', updatePublication)
api.delete('/deletePublication/:id', deletePublication)


export default api