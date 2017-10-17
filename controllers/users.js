const
    User = require('../models/User.js')

module.exports = {
    index: (req, res)=>{
        User.find({}, (err, users)=>{
            if (err) return console.log(err)
            res.render('users/index', {users})
        })
    },
    show: (req, res)=>{
        User.findById(req.params.id, (err, user)=>{
            if (err) return console.log(err)
            res.render('users/show', {user})
        })
    },
    new: (req, res)=>{
        res.render('users/new')
    },
    create: (req, res)=>{
        var newUser = new User(req.body)
        newUser.save((err, savedUser)=>{
            if (err) return console.log(err)
            res.redirect(`/users/${savedUser.id}`)
        })
    },
    edit: (req, res)=>{
        User.findById(req.params.id, (err, user)=>{
            if (err) return console.log(err)
            res.render('users/edit', {user})
        })
    },
    update:(req, res)=>{
        console.log(req.body)
        User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
            if (err) return console.log(err)
            console.log(updatedUser)
            res.redirect(`/profile`)
        })
    },
    destroy: (req, res)=>{
        User.findByIdAndRemove(req.params.id, (err, user)=>{
            if (err) return console.log(err)
            res.redirect('/')
        })
    }
}