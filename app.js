require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

// Using bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Using the CSS files
app.use(express.static("public"));
 
// Using EJS
app.set('view engine', 'ejs');

// Setting and using the cookie session or initilize our session
// this needs to be defined before the DB setup
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

// initilizing the passport
app.use(passport.initialize());
// using the session or using passport to manage out sessions
app.use(passport.session());

/* ==== Setting DB ======== */
// connecting to the MDB
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);      // saying that this is invalid

// Defining a schema for DB
const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

// Enabling the passportLocalMongoose or telling the userSchema to use passportLocalMongoose as a plugin
userSchema.plugin(passportLocalMongoose);

// Defining a DB   =>   STEP (X)
const User = mongoose.model("User", userSchema);

// using passport to create a local login strategy
passport.use(User.createStrategy());

// Using passportLocalMongoose
// This will take the details of the user and turn them into a cookie 
passport.serializeUser(User.serializeUser());           
// This will break the cookie and get the details back
passport.deserializeUser(User.deserializeUser());

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
      
// Defining a "/secrets" route 
app.get("/secrets", function(req, res) {
    // checking if the user is already logged in, then only he is allowed to see the "secrets" page directly otherwise (not logged in) he will directed to the login page
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});


// post routes for /register
app.post("/register", function(req, res) {
    
    // This method is from passport-local-mongoose and will reduce our effort for creating the new user and saving it to the DB
    User.register({username: req.body.username}, req.body.password, function(err, newRegisteredUser) {
        if (err) {
            console.log(err);
            // redirect the user to register page so that they can try again
            req.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            });
        }
    });
    
});

// logout route
app.get("/logout", function(req, res) {
    req.logout();
    // redirecting to the home page
    res.redirect("/");
});

// post route for "/login"
app.post("/login", function(req, res) {

    // Defining a new user using the details entered while login
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    // Now V will use passport to login the above user and authenticate them
    req.login(newUser, function(err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            });
        }
    });

});








app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
});








