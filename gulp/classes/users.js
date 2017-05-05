const User = require('./../models/users.js').UserModel;

function Users(profile) {
    this.id = profile.id;
    this.fullname = profile.displayName;
    this.picture = profile.photos[0].value;
}

Users.prototype.findOrCreate = function(callback) {
    var userId = this.id;
    var userFullname = this.fullname;
    var userPicture = this.picture;
    User.findOne({'id': this.id}, 'id fullname picture', function(err, person) {
        if (err)
            console.log(err);

        if(!person) {
            console.log("Making a new user");
            var user = User({
                id: userId,
                fullname: userFullname,
                picture: userPicture
            });

            user.save(function(err, res) {
                if (err)
                    console.log(err);

                callback(null, res);
            });
        } else {
            callback(null, person);
        }
    });
};

module.exports = Users;