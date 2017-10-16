const
    dotenv = require('dotenv').load({silent: true}),
    express = require('express'),
    app = express(),
    ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoDBStore = require('connect-mongodb-session')(session),
    MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/handi',
    passport = require('passport'),
    port = 3000,
    usersRouter = require('./routes/users.js')

 
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.static(`${__dirname}/public`))

mongoose.connect(MONGODB_URI, (err)=>{
    console.log(err || 'Connected to Database. 👍')
})    

app.listen(port, (err)=>{
    console.log(err || `Server Running on port ${port}. 👍`)
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.use('/users', usersRouter)