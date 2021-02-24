if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var express = require('express')
var app = express()
var bcrypt = require('bcrypt')
var passport = require('passport')
var flash = require('express-flash')
var session = require('express-session')
var methodOverride = require('method-override')

var users = []

var initPassport = require('./passport-config')
initPassport(passport, function(email){
    return users.find(async function(user){
        user.email === email
    })
},
    function(id){
        return users.find(async function(user){
            user.id === id
        })
    }
)

var hbs = require('express-handlebars')
app.set('view engine', 'handlebars')
app.engine('handlebars', hbs({
    layoutsDir:__dirname+'/views/layouts',

}))

//middleware we are using
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('main', {layout:'index', name:req.user.name})
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register', {layout:'index'})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login', {layout:'index'})
})

//POST routes
app.post('/register', checkNotAuthenticated, async function(req, res){
    try{
        var hashedPassword =  await bcrypt.hash(req.body.password, 10)

        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })

        res.redirect('/login')
    }catch(e){
        res.redirect('/register')
    }
    console.log(users)
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

//delete routes
app.delete('/logout', function(req, res){
    req.logOut()
    res.redirect('/login')
})

//functions for route protection
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return next()
}

app.listen(3000)