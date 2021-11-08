const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const Inern = require('./Models/Internship');
const dotenv= require('dotenv');
dotenv.config();
const cookieExtractor= req=>{
    let token= null;
    if(req&&req.cookies){
        token= req.cookies["access_token"];
    }
    return token;
}
//authorrization 
passport.use(new JWTStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey:process.env.secretKey

},
    (payload,done)=>{
        Inern.findById({_id:payload.sub},
      
        (err,user)=>{
            if(err)return done(err,false);

            if(user) return done(null,user);
            else return done(null,false);
        })
    }))
//authenicated local strategy using username and passwd
passport.use(new LocalStrategy(    {
    usernameField: 'userName',
    passwordField: 'password'
},(userName,password,done)=>{
    Inern.findOne({userName},(err,user)=>{
     if(err) return done(err);
     if(!user) return done(null,false);
     user.comparePassword(password,done);
 })   
})

)