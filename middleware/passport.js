const JwtStrategy = require('passport-jwt').Strategy;
const ExtraxtJwt = require('passport-jwt').ExtractJwt;
const User = require('mongoose').model('users');
const keys = require('../config/keys');

const options = {
    jwtFromRequest: ExtraxtJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (error) {
                console.log(error)
            }
        })
    )
}