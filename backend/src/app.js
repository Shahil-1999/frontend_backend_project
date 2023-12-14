const express = require('express');
const app = express();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("./db/conn")
const cookieParser = require('cookie-parser')
const path = require("path")
const hbs = require("hbs");
const User = require('./models/user');
const UserLogin = require('./models/login')
const multer = require('multer')
const imageLocalPath = 'http://localhost:3000/uploads/'

const port = process.env.PORT || 3000

// setting path
const staticpath = path.join(__dirname, "../public")
// console.log(staticpath);

const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// Middleware
app.use(express.static(staticpath))


app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)


//For getting the value which is entered by users
/*This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.

Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.*/
app.use(express.urlencoded({

    extended: true

}));

app.use(cookieParser());


// Routing
app.get("/", (req, res) => {
    res.status(200).render("index")

});

app.get("/about", (req, res) => {
    try {
        if(!req.cookies.jwt){
            res.status(400).render("login_registration")
        }else{
            const isValidUser = verifymiddleware(req.cookies.jwt);
            if(isValidUser){
                res.status(200).render("about");
            }else{
                res.status(400).render("login_registration")
            }
        }
        
    } catch (error) {
        res.send(error)      
    }

});

app.get("/blogs", (req, res) => {

    try {
        if(!req.cookies.jwt){
            res.status(400).render("login_registration")
        }else{
            const isValidUser = verifymiddleware(req.cookies.jwt);
            if(isValidUser){
                res.status(200).render("blogs");
            }else{
                res.status(400).render("login_registration")
            }
        }
        
    } catch (error) {
        res.send(error)      
    }

});

app.get("/search", (req, res) => {

    try {
        if(!req.cookies.jwt){
            res.status(400).render("login_registration")
        }else{
            const isValidUser = verifymiddleware(req.cookies.jwt);
            if(isValidUser){
                res.status(200).render("search");
            }else{
                res.status(400).render("login_registration")
            }
        }
        
    } catch (error) {
        res.send(error)      
    }

});

app.get("/contact", (req, res) => {
    try {
        if(!req.cookies.jwt){
            res.status(400).render("login_registration")
        }else{
            const isValidUser = verifymiddleware(req.cookies.jwt);
            if(isValidUser){
                res.status(200).render("contact");
            }else{
                res.status(400).render("login_registration")
            }
        }
        
    } catch (error) {
        res.send(error)      
    }

});

app.get("/login", (req, res) => {
    res.status(200).render("login_registration")

});

//To save the user entered data into the database

app.post("/contact", async (req, res) => {
    try {

        if(!(req.body.name && req.body.email && req.body.number && req.body.message)){
            return res.status(400).send("<h1>Fields Should Not be Empty</h1>")
        }else{


        const userData = new User(req.body)//now i'm requesting to the server that give me that page
        await userData.save();// Now we are going to save our data into the database
        res.status(200).render("contact");  //, {sucess:'Sucessfull submitted'}

        }

    } catch (error) {
        res.status(500).send(error);

    }
})




// Registration Part and Upload Images














const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './public/uploads')
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now()   // i m adding date.now with fil original name because if i upload same photo again then it will prevent to override.
        const originamName = file.originalname;
        
        
        return cb(null, uniqueName + '-' + originamName)
    }
  })

  
  
  const upload = multer({ storage: Storage }).single('profileImage')



app.post("/login_registration", upload, async (req, res) => {
    try {
        req.body.name = req.body.name.trim();
        req.body.email = req.body.email.trim();
        req.body.username = req.body.username.trim();
        req.body.profileImage = imageLocalPath + req.file.filename

        if (!(req.body.name && req.body.username && req.body.email && req.body.number && req.body.password && req.body.c_password)) {
            
            return res.status(400).send("<h1>Fields Should Not be Empty</h1>")
        }
        else {

            const isusername = await UserLogin.findOne(({ username: req.body.username }))

            if (!isusername) {

                if (req.body.password === req.body.c_password) {
                    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    req.body.c_password = bcrypt.hashSync(req.body.c_password, bcrypt.genSaltSync(10));


                  
                  
                    const loginData = new UserLogin(req.body)//now i'm requesting to the server that please add all the data which is entered by user.
                   console.log('login data : ',loginData);
                    


                   




                    await loginData.save();// Noe we are going to save our data into the database
                    res.status(200).render("login_registration");  //, {sucess:'Sucessfull submitted'}
                } else {
                    return res.status(400).send("<h1>Password And Current password is Not same</h1>")
                }



            } else {
                return res.status(400).send("<h1>Username is Already Exist</h1>")
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

// app.get()

//Login
app.post("/login", async (req, res) => {
    try {

        const username = req.body.username.trim(); //user entered value
        const password = req.body.password;

        if (!(username && password)) {
            return res.status(400).send("<h1>Fields Should Not be Empty</h1>")
        } else {


            const findUsername = await UserLogin.findOne({ username: username }) //first for database username and second one is for user entered username.
            if (!findUsername) {    
                res.status(400).send("<h1>User Dose'nt Exist</h1>")

            } else {
                //Checking password~
                let hashPassword = findUsername.password;
                if(bcrypt.compareSync(password, hashPassword)){
                    
                    const token = await jwt.sign({
                        id: findUsername._id,
                        username: findUsername.username,
                        email: findUsername.email
                    }, 'iFeelThatYouAreAAuthenticPerson', {
                        expiresIn: '5 minutes'
                    })
                //    console.log('token : => ', token)
                   res.cookie('jwt', token,{
                    expires: new Date(Date.now() + 300000)
                   })
                   res.render("blogs")

                                      
                


                
                }else{
                    res.status(400).send("<h1>Invalid Credientials</h1>")
                }

            }

        }

    } catch (error) {
        res.status(400).send("Error Invalid Username")
    };


});


//middleware
const verifymiddleware = async (token)=>{
    const userVerification = await jwt.verify(token,'iFeelThatYouAreAAuthenticPerson' )
    return userVerification
}



// Server Listen
app.listen(port, () => {
    console.log(port, "Connection is Sucessfully Establish");

})


