const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: String, required: true},
    fullname: {type: String, required: true},
    picture: {type: String, required: true},
    stories : [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

const CourseSchema = new Schema({
    name: {type: String, required: true},
});

const UserModel = mongoose.model("User", UserSchema);
const CourseModel = mongoose.model("Course", CourseSchema);

module.exports = {
    UserModel,
    CourseModel
};
