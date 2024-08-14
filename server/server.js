
const express= require('express')
const cors= require('cors')
const app= express()
const router= require('./router/auth')
const connectDb = require('./utils/db')
const errorMiddleware= require('./middlewares/error-middleware')
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'POST,GET,PUT,DELETE,PATCH,HEAD' ,
    Credentials: true
  }
app.use(express.json())
app.use(cors(corsOptions))
const PORT= 5000
app.use('/api/auth',router)
app.use(errorMiddleware)
connectDb().then(()=>{
app.listen(PORT, ()=> {
    console.log( ' server is running at' +{PORT})
})})