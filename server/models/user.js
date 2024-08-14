const mongoose= require('mongoose')
const jwt = require('jsonwebtoken');
const bycrypt=require('bcrypt')
const userSchema= new mongoose.Schema({

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
    phone:{
        type: String,
        require: true,
        
    },
    password:{
        type:String,
        require: true,
    },
    isAdmin:{
        type: Boolean,
        default: false

    },

})
userSchema.methods.comparepassword = async function(password) {
    return await bycrypt.compare(password, this.password);
};



userSchema.methods.generatetoken= async function()  {
    try{
       return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        
            process.env.JWTSKT,
        {
            expiresIn: '30d'
        }
       )
       

    }
    catch(error){
        console.error(error)
    }

}
const User = mongoose.model('User', userSchema);


userSchema.pre("save", async function (next){
    const user= this
    if (!user.isModified('password')){
        return next()
    }
    try{
        const saltround= bcrypt.genSaltSync(10)
        const hash_password= bcrypt.hashSync(user.password, saltround)
        user.password= hash_password
        return next()

    }
    catch(error){
        return next(error)
    }

})
module.exports = User;
