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
    MONGODB_URI = process.env.MONGODB_URI 
    port = process.env.PORT || 3000,
    usersRouter = require('./routes/users.js')

const store = new MongoDBStore({
    url: MONGODB_URI,
    collection: 'sessions'
})

app.use(logger('dev'))
app.use(express.static(__dirname + 'public'))

app.use(methodOverride('_method'))
 
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
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
})



app.get('/', (req, res)=>{
    res.render('index')
})

app.use('/', usersRouter)

app.listen(port, (err)=>{
    console.log(err || `Server Running on port ${port}. 👍`)
})

console.log(`about to connect mongodb at: ${MONGODB_URI}`)
mongoose.connect(MONGODB_URI, (err)=>{
    console.log(err || `Connected to Database. 👍 at: ${MONGODB_URI}`)
})