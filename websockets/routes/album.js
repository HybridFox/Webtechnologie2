const express = require("express");
const albums = require("./../controllers/album");

module.exports = function getRouter(app) {
    const router = new express.Router();

    router.route('/')
        .get(albums.list)
        .post(albums.create);

    app.use('/albums', router);
};