import startMongoDbServer from "./mongodb"
import { startServer } from "./server"

const connect = () => {
    startMongoDbServer()
    startServer()
}

export { connect }