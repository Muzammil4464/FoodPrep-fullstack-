const express = require('express')
const app = express()
const connectDB = require('./config/dbConn')

const port = process.env.PORT || 4000;

app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()
app.use("/image",express.static('uploads'))

connectDB()

app.use('/api/food',require('./routes/foodRouter'))
app.use('/api/user',require('./routes/userRouter'))
app.use('/api/user',require('./routes/cartRouter'))
app.use('/api/order',require('./routes/orderRouter'))


app.get("/",(req,res)=>{
    res.send("API Working ")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})