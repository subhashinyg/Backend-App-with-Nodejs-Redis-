import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import { initDesgination } from "../../models/enterprice/designation-model";
import { RedisHandler } from "../../utilities/redis-handler";
dotenv.config()

const startMongoDbServer = () => {
    const url = process.env.DBURL as string
    const redisHandler = new RedisHandler()
    mongoose.connect(url)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'db connection error'))
    db.once ('open', async () => {
        dbInititate()
        await redisHandler.connect();
        console.log(`Db connected to url:${url}`)
    })
    
}

// used to set up initial data to the database
const dbInititate = async () => {
    initDesgination()
}

export default startMongoDbServer