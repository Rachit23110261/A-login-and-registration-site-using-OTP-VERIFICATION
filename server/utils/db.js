require('dotenv').config()
const moongoose= require('mongoose')
// const URI='mongodb://localhost:27017/inotebook'
const URI= process.env.MONGO_URI
const connectDb= async ()=>{
    try{
        await moongoose.connect(URI)
        console.log('connected to mongodb')
    }
    catch{
        console.error('connection failed')
        process.exit(0)
    }
}
module.exports= connectDb