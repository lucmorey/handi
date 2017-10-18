const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    interestsSchema =new mongoose.Schema({ 
        interest: String
    }),

    usersSchema = new mongoose.Schema({
        userName: {type: String, required: true, minlength: 1},
        email: {type: String, required: true, unique: true, minlength: 1},
        password: {type: String, required: true},
        interests: [interestsSchema]
    }, {timestamps: true})

    
usersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

usersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', usersSchema)