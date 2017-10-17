const
    mongoose = require('mongoose'),
    interestsSchema = new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        title: {type: String},
        genre: {type: String},
        winsPile: {type: Boolean, default: false},
        url: {type: String},
    }, {timestamps: true})

module.exports = mongoose.model('Interest', interestsSchema)