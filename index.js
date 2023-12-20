
// Server Dependencies

const express = require("express")
require('dotenv').config()
const cookieParser =require("cookie-parser")
const DB= require("./db")
const app = express()
const port = process.env.PORT || 5000


// Models Imports
const user = require("./routes/userRout")
const url = require('./routes/urlRout')

// DB Connection
DB()


// Server Config
app.use(express.json())
app.use(cookieParser())



// app.get("/", (req, res) =>{
//     res.status(200).json({msg:"every thing work properly"})
// })

// Routes Definitions
app.use('/', url)
app.use("/user", user)


// 404 Handling
app.get("/*", (req, res) =>{
    res.status(404).json({msg:"request not valid"})
})


// Server Port Controls
app.listen(port, () =>{
    console.log(`server started on port: ${port}`)
})