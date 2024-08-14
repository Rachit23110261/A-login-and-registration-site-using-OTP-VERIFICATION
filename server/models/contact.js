const mongoose= require('mongoose')
const jwt = require('jsonwebtoken');
const ContactSchema= new mongoose.Schema({

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
    message:{
        type: String,
        require: true,
    }

    })
    const Contact= mongoose.model('Contact', ContactSchema);
    module.exports= Contact