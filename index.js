const
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
    passport = require('passport'),
    port = 3000,
    mongoConnectionString = 'mongodb://localhost/handi'
 
mongoose.connect(mongoConnectionString, (err)=>{
    console.log(err || 'Connected to Database. 👍')
})    

app.listen(port, (err)=>{
    console.log(err || `Server Running on port ${port}. 👍`)
})

app.get('/', (req, res)=>{
    res.send('homepage working')
})