import { Application } from "express"
import auth_route from './auth/auth-route'
import user_route from './user/user-route'

const AppEndPoints = (app:Application)=>{
    app.get('/',(req,res)=>res.send('Welcome to Collab rest API'))
    app.use('/auth',auth_route)
    app.use('/user',user_route)
}

export { AppEndPoints }