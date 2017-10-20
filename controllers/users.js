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
        for(field in req.body) {
            if(req.body[field].length == 0) {
                req.flash('editProfileMessage', 'Please include all fields...')
                return res.redirect('/edit')
            }
        }
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
    },
    interest: (req, res) => {
        var flag = false;
        User.findById(req.params.id, (err, user)=> {
            if (err) return console.log(err)
            console.log(req.body.interest)
            user.interests.forEach((el) => {
                if (req.body.interest === el.interest) {
                    flag = true
                }   
            })
            if (flag) {
                res.json({message:"Matched value", success:false})
            }
            else {
                user.interests.unshift(req.body)
                user.save((err, updateUser) => {
                    if (err) return console.log(err) 
                    res.json(updateUser.interests[0]._id)
                })
            }            
        })
     },
    populate: (req, res)=>{
        User.findById(req.params.id, (err, user)=>{
            if (err) return console.log(err)
            res.send(user)
        })
    },
    deleteInterest: (req, res)=>{
        User.findById(req.params.userId, (err, user)=>{
            if (err) return console.log(err)
            var interestIndex = user.interests.findIndex((el)=>{
                return el.id == req.params.interestId
            })
            user.interests.splice(interestIndex, 1)
            user.save((err, updatedUser)=>{
                if (err) return console.log(err)
                res.send(user)
            })
        })
    },
    addWin: (req, res) => {
        var flag = false
        User.findById(req.params.id, (err,user) => {
            if (err) return console.log(err)
            user.wins.forEach((el)=>{
                if (req.body.win === el.win) {
                    flag = true
                }
            })
            if (flag) {
                res.json({message:"Matched value", success:false})
            } else {
                user.wins.unshift(req.body)
                user.save((err, updateUser) => {
                    if (err) return console.log(err)
                    res.send(updateUser)
                })
            }
        })
    },
    deleteWin: (req, res)=>{
        User.findById(req.params.userId, (err, user)=>{
            if (err) return console.log(err)
            var winIndex = user.wins.findIndex((el)=>{
                return el.id == req.params.winId
            })
            user.wins.splice(winIndex, 1)
            user.save((err, updatedUser)=>{
                if (err) return console.log(err)
                res.send(updatedUser)
            })
        })
    }
}

