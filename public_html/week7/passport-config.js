var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){
    var authenticateUser = async function(email, password, done){
        var user = await getUserByEmail(email)
        if (user == null){
            return done(null, false, {message: 'User not found'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message:'Password incorrect'})
            }
        }catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField:'email'}, authenticateUser))
    passport.serializeUser(function(user, done){
        done(null, user.id)
    })
    passport.deserializeUser(function(id, done){
        return done(null, getUserById(id))
    })
}
module.exports = initialize