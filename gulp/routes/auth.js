var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const User = require("./../classes/users");

passport.use(
    new FacebookStrategy({
        clientID: 300290473724841,
        clientSecret: "7a4ca657fdacb197e13031b416207afe",
        callbackURL: "http://localhost:3000/auth/facebook/return",
        profileFields: ['id', 'email', 'displayName', 'name', 'gender', 'picture.type(large)']
    }, function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    })
);

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/facebook/return', function (req, res, next) {
    passport.authenticate('facebook', function (err, profile, info) {
        if (err) {
            return next(err);
            // let the next route handler do its thing...
            // or you can handle the error yourself within this
            // callback.
        }

        // if the user returns as nothing (doesn't exist) then redirect
        if (!profile) {
            // this takes the place of failureRedirect
            return res.redirect('/');
        }

        req.logIn(profile, function (err) {
            if (err) {
                return next(err); // again - on error, 'next' depending on your requirement.
            }

            var user = new User(profile);
            user.findOrCreate(function(err, person) {
                if (err)
                    console.log(err);

                console.log("MEMES", person);

                req.user.picture = person.picture;

                return res.redirect('/user/' + user.id);
            });
        });
    })(req, res, next);
});

module.exports = router;
