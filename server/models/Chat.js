
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken');
const ChatSchema= new mongoose.Schema({

    usernameFrom: {
        type : String,
        require: true
    },
    emailFrom: {
        type: String,
        require: true,
        unique: true,
        // match: /^\S+@\S+\.\S+$/,

    },
    usernameTO: {
        type : String,
        require: true
    },
    emailTo: {
        type: String,
        require: true,
        unique: true,
        // match: /^\S+@\S+\.\S+$/,

    },
    message:{
        type: String,
        require: true,
    }

    })
    const Chat= mongoose.model('Chat', ChatSchema);
    module.exports= Chat