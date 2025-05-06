const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
} , {timestamps:true});


userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})

userSchema.methods.ispasswordcorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}


const User = mongoose.model("User" , userSchema);
module.exports = User;