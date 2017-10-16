const
    express = require('express')
    usersRouter = new express.Router()
    usersCntr = require('../controllers/users.js')

usersRouter.route('/login')
    .get((req, res)=>{
        res.render('login')
    })

usersRouter.route('/signup')
    .get((req, res)=>{
        res.render('signup')
    })

usersRouter.route('/')
    .get(usersCntr.index)
module.exports = usersRouter