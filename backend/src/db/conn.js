const mongoose = require("mongoose")


// connecting and creating a database
const dbConnector = "mongodb+srv://biswarup:Sp2ZtDfHdUE4LPCE@cluster0.ignsp.mongodb.net/Shahil_Database";
// mongodb://127.0.0.1/test

mongoose.connect(dbConnector,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(()=>{
    console.log("Connection Sucessfull");
}).catch((error)=>{
    console.log(error);
})