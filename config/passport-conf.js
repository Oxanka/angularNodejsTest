const passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    Token = require('../models/Token'),
    User = require('../models/User')

module.exports = function(app, passport) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(User.createStrategy());
    passport.use(new BearerStrategy(
        function (token, done) {
            Token.belongsTo(User, {foreignKey: 'userId'});
            var querySettings = {
                include: [
                    {
                        model: User
                    }
                ],
                where: {hash: token}
            };

            Token.findOne(querySettings)
                .then(function (token) {
                    if (err) { return done(err); }
                    if (!token) { return done(null, false); }
                    token.lastUsed = Date.now();
                    token.save();
                    return done(null, token.user);
            })
            // global.models.token.findOne({ hash: token }).populate('user').exec(function (err, token) {
            //     if (err) { return done(err); }
            //     if (!token) { return done(null, false); }
            //     if ((Math.abs(Date.now() - token.lastUsed) / 36e5) >= 24){
            //         global.models.answer.remove({
            //             user: token.user._id
            //         }, function(err, result) { })
            //     }
            //     token.lastUsed = Date.now();
            //     token.save();
            //     return done(null, token.user);
            // });
        }
    ));


    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    return passport;
}