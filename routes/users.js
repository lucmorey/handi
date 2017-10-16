const
    express = require('express')
    usersRouter = new express.Router()
    usersCntr = require('../controllers/users.js')

usersRouter.route('/login')
    .get((req, res)=>{
        res.render('login')
    })


module.exports = usersRouter