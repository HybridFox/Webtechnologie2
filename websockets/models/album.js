const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    imageUrl: {type: String}
});

const AlbumModel = mongoose.model("Album", AlbumSchema);
module.exports = AlbumModel;