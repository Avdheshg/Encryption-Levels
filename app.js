require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

    // Here the bcrypt will generate a hash function also using the salting and return return the generated hash function to us so that V can save them into DB
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        
        // After V have generated our hash function then V will define a new user with that hash function and will save it to the DB

        // Grab the users email and password and save them to the DB
        const newUser = new User({
            email: req.body.username,
            password: hash    // turning the password into a hash function
        });

        // saving the user to DB
        newUser.save(function(err) {
            if (!err) {
                res.render("secrets");
            } else {
                console.log(err);
            }
        });
    });
    
    
});

// post route for "/login"
app.post("/login", function(req, res) {
    // Grab the details entered
    const emailEntered = req.body.username;
    const passwordEntered = req.body.password;

    // find the details entered in the DB
    User.findOne({email: emailEntered}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                // Here V will again generate the hash with the password entered and then compare it with the password(saved as hash) present in the DB 
                // This function takes 2 params one is entered text and another is the hsah present in our DB(our hash is present in foundUser.password)
                bcrypt.compare(passwordEntered, foundUser.password, function(err, isHashMatched) {
                    if (isHashMatched) {
                        res.render("secrets");
                    }
                });
            }
        }
    });
});








app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
});








