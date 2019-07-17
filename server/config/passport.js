const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const Users = mongoose.model('users');
const keys = require("../config/keys");

//containing options to control how the
// token is extracted from the request or verified.
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// verifying the token's signature
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        //find the current user using payload
        Users.findById(jwt_payload.id)
            .then(user => {
            if (user){
                // return or attach user to req.body so that it could be send as response later in route.get('/current')
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
            .catch(err =>{console.log(err)})
    }))
};
