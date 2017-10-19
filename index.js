const
    dotenv = require('dotenv').load({silent: true}),
    express = require('express'),
    app = express(),
    methodOverride = require('method-override')
    ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    search = require('youtube-search'), 
    port = process.env.PORT || 3000,
    usersRouter = require('./routes/users.js')

const store = new MongoDBStore({
    url: 'mongodb://heroku_dljn6htf:mig8dqtkli3i1cin3gqgckf6q5@ds125195.mlab.com:25195/heroku_dljn6htf',
    collection: 'sessions'
})

app.use(logger('dev'))
app.use(express.static(__dirname + 'public'))

app.use(methodOverride('_method'))
 
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.static(`${__dirname}/public`))
app.use(flash())
app.use(session({
    secret: 'comes in handy',
    cookie: {maxAge: 60000000},
    resave: true,
    saveUninitialized: false,
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next)=>{
    app.locals.currentUser = req.user
    app.locals.loggedIn = !!req.user
    next()
})

mongoose.connect('mongodb://heroku_dljn6htf:mig8dqtkli3i1cin3gqgckf6q5@ds125195.mlab.com:25195/heroku_dljn6htf', (err)=>{
    console.log(err || 'Connected to Database. 👍')
})    

opts = {
    maxResults: 3,
    key: process.env.YOUTUBE_API_KEY
}

app.get('/search', (req, res) => {
    search(req.query.term, opts, function(err, results) {
        if(err) return console.log(err);
        console.log(results)
        res.send(results)
    })
    // console.dir(results);
})

app.listen(port, (err)=>{
    console.log(err || `Server Running on port ${port}. 👍`)
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.use('/', usersRouter)