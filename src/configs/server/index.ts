import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import middlewares from '../middleware'
import { AppEndPoints } from '../../routes'

dotenv.config()

const app: Application = express()

const startServer = () => {
    let port = portNumber()
    middlewares(app)
    AppEndPoints(app)
    const server = app.listen(port, () => console.log(`server connected ${port}`))
    Backgroundtask()
}

const portNumber = (): number => {
    return Number(process.env.PORT) || 8080
}

//can be used for running cron jobs
const Backgroundtask = () => {

}

export { startServer }