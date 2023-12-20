
const mongoose  = require('mongoose')

const urlSchema =  new mongoose.Schema({
    shortId:{
        type: String,
        require: true
    },
    redirectUrl:{
        type:String,
        require: true
    }
},{timestamps: true})


module.exports = mongoose.model("Url", urlSchema)