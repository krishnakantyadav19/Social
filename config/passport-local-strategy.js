const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField :'email',
    passReqToCallback: true
    },
    function(req , email, password, done){
        //find user and establish the identity
        User.findOne({email: email}, function(err, user) {
            if(err){
                req.flash('error',err)
                return done(err)
            }
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/password')
                return done(null,false)
            }
            return done(null,user)
        })
    }
))

//serializing the user to decide which key is to kept int the cookies
passport.serializeUser(function(user, done){
    done(null, user.id)
})
//Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --->passport serialize')
            return done(err)
        }
        return done(null, user)
    })
})

//check if the user is authenticate
passport.checkAuthentication = function(req, res ,next){
    //if the user is sign in ,then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not sign in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res ,next){
    if(req.isAuthenticated()){
        //req.user contains the current sign in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user =req.user
    }
    next()
}

module.exports = passport