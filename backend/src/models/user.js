const mongoose = require("mongoose")
const validation = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")

const userDetails =  mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        validate(value){
            if (!validation.isEmail(value)) {
                throw new Error("Invalid Email Type")
                
            }
        }

    },
    number:{
        type:Number,
        required:true,
        min:10

    },
    message:{
        type:String,
        required:true,
        minLength : 10

    }
},
{
    
        timestamps: true,
        versionKey: false
    
    })

// Creating Collection
const User = mongoose.model("user_table", userDetails)
module.exports = User;