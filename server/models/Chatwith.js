
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken');
const ChattwithSchema= new mongoose.Schema({

    username: {
        type : String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        // match: /^\S+@\S+\.\S+$/,

    },
    

    })
    const Chattwith= mongoose.model('Chattwith', ChattwithSchema);
    module.exports= Chattwith