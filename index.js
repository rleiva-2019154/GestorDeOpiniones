//EJecutar servicios
import { initServer } from "./configs/app.js"
import { connect } from "./configs/mong.js" 
import { adminDef } from "./src/user/user.controller.js"

initServer()
connect()
adminDef()