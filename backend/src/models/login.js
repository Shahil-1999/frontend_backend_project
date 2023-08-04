const mongoose = require("mongoose")


const loginDetails =  mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    username:{
        type:String,
        required:true,
     

    },
    email:{
        type:String,
        required:true,
     

    },
    number:{
        type:Number,
        required:true,
     

    },

    profileImage:{ type: String ,
        data:Buffer
        },
      
    
    password:{
        type:String,
        required:true,
     

    },
    c_password:{
        type:String,
        required:true,
      

    }
},
{
    
        timestamps: true,
        versionKey: false,
        
    
    })

// Creating Collection
const UserLogin = mongoose.model("login_table", loginDetails)
module.exports = UserLogin;