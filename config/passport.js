const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user)
    })
})

// sign up

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
    User.findOne({email: email}, (err, user)=>{
        if (err) return done(err)
        if (user) return done(null, false, req.flash('signupMessage', 'That email is taken...'))
        var newUser = new User()
        newUser.userName = req.body.name
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        console.log('user')
        console.log(newUser)

        newUser.save((err)=>{
            if(err) throw err
            return done(null, newUser, null)
        })
    })
}))

// local login

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
    User.findOne({email: email}, (err, user)=>{
        if (err) return done(err)
        if (!user) return done(null, false, req.flash('loginMessage', 'No User Found...'))
        if (!user.validPassword(password)) return done(null, false, req.flash('passwordMessage', "Something went wrong..."))
        return done(null, user)
    })
}))

module.exports = passport