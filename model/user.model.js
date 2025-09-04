const  { Schema, default: mongoose } = require("mongoose");

const userSchema=new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true }
})

const User=mongoose.model('User',userSchema);
module.exports=User;