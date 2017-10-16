const
    express = require('express')
    usersRouter = new express.Router()

usersRouter.route('/login')
    .get((req, res)=>{
        res.render('login')
    })

module.exports = usersRouter