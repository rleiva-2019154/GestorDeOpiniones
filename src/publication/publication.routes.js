'use strict'

import { Router } from "express"
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { 
    testPublication,
    savePublication
} from "./publication.controller.js"

const api = Router()

api.get('/testPublication', testPublication)
api.post('/savePublication', savePublication)
/*api.put('/updateCompany/:id', updateCompany)
api.get('/listCompanies', [validateJwt, isAdmin], listCompanies)
api.get('/filterCompaniesByYears', [validateJwt, isAdmin], filterCompaniesByYears)
api.get('/filterCompaniesByCategory', [validateJwt, isAdmin], filterCompaniesByCategory)
api.get('/sortCompaniesAZ', [validateJwt, isAdmin], sortCompaniesAZ)
api.get('/sortCompaniesZA', [validateJwt, isAdmin], sortCompaniesZA)
api.get('/generateExcelReport', [validateJwt, isAdmin], generateExcelReport)*/


export default api