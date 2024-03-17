const express=require("express")
const connectDB = require("./database/db")
const app=express()
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require('./routes/posts')
const followRoute = require("./routes/follows"); 
const {errorHandler}=require("./middlewares/error")


dotenv.config()
app.use(errorHandler)

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use( "/api/post" ,postRoute);
app.use("/api/follow", followRoute);




process.env.JWT_SECRET = 'cdanckadn';

process.env.JWT_EXPIRE = "5d";

    app.listen(process.env.PORT,()=>{
        connectDB()
        console.log("App is running")
    })