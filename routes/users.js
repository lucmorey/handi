const
    express = require('express')
    passport = require('passport')
    usersRouter = new express.Router()
    usersCntr = require('../controllers/users.js')

usersRouter.route('/login')
    .get((req, res)=>{
        res.render('login')
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }))

usersRouter.route('/signup')
    .get((req, res)=>{
        res.render('signup')
    })
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }))


usersRouter.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile', {user: req.user})
})

usersRouter.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})


usersRouter.route('/')
    .get(usersCntr.index)

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = usersRouter