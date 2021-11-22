require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

// Using bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Using the CSS files
app.use(express.static("public"));
 
// Using EJS
app.set('view engine', 'ejs');

/* ==== Setting DB ======== */
// connecting to the MDB
mongoose.connect("mongodb://localhost:27017/userDB");

// Defining a schema for DB
const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

// Accessing the enviroment variables
// console.log(process.env.API_KEY);

// For encryption, key was here

// Do this before (X)
userSchema.plugin(encrypt, { secret: process.env.SECRET,  encryptedFields: ["password"] });   // this will encrypt the whole DB (which V don't want and V will search through our DB in future and V can't search for encrypted messages) so here our task is to encrypt only the password field and leave the email field unencrypted


// Defining a DB   =>   STEP (X)
const User = mongoose.model("User", userSchema);

// ======= Setting Routes   =======
app.get("/", function(req, res) {
    res.render("home");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/login", function(req, res) {
    res.render("login");
});


// post routes for /register
app.post("/register", function(req, res) {
    // Grab the users email and password and save them to the DB
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    // saving the user to DB
    newUser.save(function(err) {
        if (!err) {
            res.render("secrets");
        } else {
            console.log(err);
        }
    })
});

// post route for "/login"
app.post("/login", function(req, res) {
    // Grab the details entered
    const emailEntered = req.body.username;
    const passwordEntered = req.body.password;

    // find the details entered in the DB
    User.findOne({email: emailEntered}, function(err, foundUSer) {
        if (err) {
            console.log(err);
        } else {
            if (foundUSer) {
                if (foundUSer.password === passwordEntered) {
                    res.render("secrets");
                }
            }
        }
    });
});








app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
});








