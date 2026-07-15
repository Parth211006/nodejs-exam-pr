import mongoose from "mongoose"
import envConfig from "./envConfig.js";
const db=async()=>{
    try {
        await mongoose.connect(envConfig.MONGODB_URL);
        console.log('Database Connected..')
    } catch (error) {
        console.log(error.message)
    }
}

export default db();